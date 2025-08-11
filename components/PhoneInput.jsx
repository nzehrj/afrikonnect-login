'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { Phone, ChevronDown } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import { motion, AnimatePresence } from 'framer-motion'
import CulturalQuote from './CulturalQuote'

const countryCallingCodes = {
  NG: '+234',
  KE: '+254',
  GH: '+233',
  ZA: '+27',
  UG: '+256',
  TZ: '+255',
  CM: '+237',
  SN: '+221',
}

const africanCountries = Object.entries(countryCallingCodes).map(
  ([cc, code]) => ({
    code: cc,
    callingCode: code,
  })
)

const phoneSchema = z.object({
  phone: z
    .string()
    .min(4, 'Phone number is too short')
    .refine((val) => {
      const phoneNumber = parsePhoneNumberFromString(val)
      return phoneNumber ? phoneNumber.isValid() : false
    }, 'Invalid phone number'),
})

export default function PhoneInput({ onSuccess }) {
  const [countryCode, setCountryCode] = useState('NG')
  const [phoneValue, setPhoneValue] = useState(countryCallingCodes['NG'] || '')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const containerRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(phoneSchema),
  })

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
          )
          const data = await res.json()
          const cc = data?.address?.country_code?.toUpperCase()
          if (cc && countryCallingCodes[cc]) {
            setCountryCode(cc)
            const prefix = countryCallingCodes[cc]
            setPhoneValue(prefix)
            setValue('phone', prefix)
          }
        } catch (err) {
          console.warn('Geo lookup failed:', err)
        }
      },
      () => {}
    )
  }, [setValue])

  const handleCountrySelect = (cc) => {
    setCountryCode(cc)
    const prefix = countryCallingCodes[cc] || ''
    setPhoneValue(prefix)
    setValue('phone', prefix)
    setDropdownOpen(false)
  }

  const onSubmit = (data) => {
    console.log('Phone Submitted:', data)
    onSuccess?.(data.phone)
  }

  // Close on outside click, but not scrollbar
  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target
      const clickX = event.clientX
      const clickY = event.clientY
      const isOnVerticalScrollbar =
        clickX >= document.documentElement.clientWidth
      const isOnHorizontalScrollbar =
        clickY >= document.documentElement.clientHeight

      if (isOnVerticalScrollbar || isOnHorizontalScrollbar) return

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !containerRef.current.contains(target)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <CulturalQuote />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 w-[280px] md:w-[250px] mx-auto relative mt-5'
        ref={containerRef}
      >
        <label className='block text-sm font-medium text-amber-100 mb-2'>
          Enter Phone Number
        </label>

        <div className='flex items-center border rounded-lg px-4 py-3 bg-white shadow-sm relative'>
          <Phone size={18} className='text-gray-500 mr-2' />

          <button
            type='button'
            onClick={() => setDropdownOpen((prev) => !prev)}
            className='flex items-center space-x-1 focus:outline-none w-[20%] justify-between'
          >
            <ReactCountryFlag
              svg
              countryCode={countryCode}
              style={{ width: '1.5rem', height: '1rem' }}
              title={countryCode}
            />
            <ChevronDown size={14} className='text-gray-500' />
          </button>

          <input
            type='tel'
            placeholder='801 234 5678'
            {...register('phone')}
            value={phoneValue}
            onChange={(e) => {
              setPhoneValue(e.target.value)
              setValue('phone', e.target.value)
            }}
            className='flex-1 outline-none bg-transparent text-black text-xs pl-2'
          />
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              ref={dropdownRef}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className='absolute top-[72px] left-0 w-[50%] bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto'
            >
              {africanCountries.map(({ code, callingCode }) => (
                <li
                  key={code}
                  className='flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleCountrySelect(code)}
                >
                  <ReactCountryFlag
                    svg
                    countryCode={code}
                    style={{ width: '1.5rem', height: '1rem' }}
                    title={code}
                    className='mr-2'
                  />
                  <span className='text-sm font-medium'>{code}</span>
                  <span className='text-xs text-gray-500 ml-auto'>
                    {callingCode}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {errors.phone && (
          <p className='text-red-500 text-xs'>{errors.phone.message}</p>
        )}

        <button
          type='submit'
          className='bg-gradient-to-r from-green-800 to-green-950 hover:from-green-900 hover:to-black transition-colors duration-300 text-white font-semibold px-4 py-3 rounded-md shadow w-full text-sm'
        >
          CONTINUE
        </button>
      </form>
    </div>
  )
}
