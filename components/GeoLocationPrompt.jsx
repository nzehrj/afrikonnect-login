'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CulturalQuote from './CulturalQuote'

export default function GeoLocationPrompt({ onSuccess }) {
  const [loading, setLoading] = useState(true)
  const [inAfrica, setInAfrica] = useState(null)
  const [error, setError] = useState(null)

  const africanCountries = [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Democratic Republic of the Congo',
    'Republic of the Congo',
    "Côte d'Ivoire",
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Eswatini',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Rwanda',
    'São Tomé and Príncipe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Tanzania',
    'Togo',
    'Tunisia',
    'Uganda',
    'Zambia',
    'Zimbabwe',
  ]

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          const country = data?.address?.country

          const isAfrican = africanCountries.includes(country)
          setInAfrica(isAfrican)
          setLoading(false)

          if (isAfrican) onSuccess()
        } catch (err) {
          setError('Failed to detect location')
          setLoading(false)
        }
      },
      () => {
        setError('Permission denied or failed to get location')
        setLoading(false)
      }
    )
  }, [])

  return (
    <>
      <div className='max-w-md mx-auto mt-10'>
        <CulturalQuote />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='max-w-md mx-auto text-center mt-6 p-6 bg-forest-shadow text-parchment rounded-lg shadow'
      >
        {loading && <p>Detecting your location...</p>}

        {error && <p className='text-red-400'>{error}</p>}

        {!loading && inAfrica === false && (
          <div
            className=' p-4 rounded-md shadow text-white'
            style={{
              background:
                'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
            }}
          >
            <p className='font-medium mb-2'>
              🌍 You’re currently outside your homeland.
            </p>
            <p className='mb-4'>
              Switch to <strong>‘Travel Mode’</strong> or verify via a trusted
              in-Africa contact.
            </p>
            <button
              onClick={onSuccess}
              className='bg-forest-deep text-white w-full px-4 py-2 rounded-md hover:bg-forest-shade'
            >
              Continue in Travel Mode
            </button>
          </div>
        )}
      </motion.div>
    </>
  )
}
