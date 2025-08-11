'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PhoneInput from '@/components/PhoneInput'
import GeoLocationPrompt from '@/components/GeoLocationPrompt'
import OTPVerification from '@/components/OTPVerification'
import VoiceBinding from '@/components/VoiceBinding'
import RoleSelector from '@/components/RoleSelector'
import Dashboard from './dashboard/page'

export default function Home() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [currentTime, setCurrentTime] = useState(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setCurrentTime(new Date())

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const handlePhoneSuccess = (value) => {
    setPhone(value)
    setStep(2)
  }

  const handleLocationSuccess = () => setStep(3)
  const handleOTPSuccess = () => setStep(4)
  const handleVoiceSuccess = () => setStep(5)
  const handleRoleSuccess = () => setStep(6)

  const goToLogin = () => {
    setPhone('')
    setStep(1)
  }

  const getGreeting = () => {
    if (!currentTime) return ''
    const hour = currentTime.getHours()
    if (hour >= 0 && hour < 12) return t('Good Morning Traveler')
    if (hour >= 12 && hour < 17) return t('Good Afternoon Traveler')
    return t('Good Evening Traveler')
  }

  const getTimeOfDay = () => {
    return currentTime?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 '>
      <div className='text-center mb-4 '>
        {hasMounted && (
          <>
            <p className='text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4'>
              {getTimeOfDay()}
            </p>
            <h2 className='text-2xl font-semibold text-gray-300'>
              {getGreeting()}
            </h2>
          </>
        )}
      </div>

      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.div
            key='step1'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <PhoneInput onSuccess={handlePhoneSuccess} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key='step2' {...motionProps}>
            <GeoLocationPrompt onSuccess={handleLocationSuccess} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key='step3' {...motionProps}>
            <OTPVerification phone={phone} onSuccess={handleOTPSuccess} />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key='step4' {...motionProps}>
            <VoiceBinding onSuccess={handleVoiceSuccess} />
          </motion.div>
        )}
        {step === 5 && (
          <motion.div key='step5' {...motionProps}>
            <RoleSelector onSuccess={handleRoleSuccess} />
          </motion.div>
        )}
        {step === 6 && (
          <motion.div key='dashboard' {...motionProps}>
            <Dashboard onBackToLogin={goToLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

const motionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
}
