'use client'

import React, { useState } from 'react'
import CulturalQuote from './CulturalQuote'

export default function OTPVerification({ onSuccess }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp === '123456') {
      setIsVerified(true)
      setError('')
    } else {
      setError('Invalid OTP. Try 123456 for demo.')
    }
  }

  return (
    <>
      <div className='mb-6'>
        <CulturalQuote />
      </div>

      <div className='space-y-4 mt-8'>
        <h2 className='text-xl font-bold'>OTP Verification</h2>
        {!isVerified ? (
          <form onSubmit={handleSubmit} className='space-y-2'>
            <input
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder='Enter OTP'
              className='border-2 border-parchment outline-none px-3 py-2 rounded w-full'
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button
              type='submit'
              className=' bg-forest-deep hover:bg-moss-stone text-white font-bold px-8 py-2 rounded'
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <div className='space-y-2'>
            <p className='text-parchment-cream font-medium'>
              OTP verified successfully ✅
            </p>
            <button
              onClick={onSuccess}
              className='bg-forest-shade hover:bg-forest-deep text-white font-bold px-8 py-2 rounded'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}
