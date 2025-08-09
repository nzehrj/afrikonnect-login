'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic } from 'lucide-react'

export default function VoiceBinding({ onSuccess }) {
  const { t } = useTranslation()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState('')
  const [isBound, setIsBound] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.lang = 'en-NG'
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript
        setTranscript(speechResult)
        simulateDialectDetection(speechResult)
      }

      recognition.onerror = (event) => {
        setError(`${t('speechError')}: ${event.error}`)
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    } else {
      setError(t('browserUnsupported'))
    }
  }, [t])

  const handleStart = () => {
    if (recognitionRef.current) {
      setTranscript('')
      setError('')
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const simulateDialectDetection = (text) => {
    const dialectWords = [
      'akwaaba',
      'bawo',
      'kaabo',
      'sannu',
      'ndewo',
      'nnoo',
      'wahala',
      'chai',
      'abeg',
      'omo',
    ]
    const lowerText = text.toLowerCase()

    const match = dialectWords.find((word) => lowerText.includes(word))

    if (match) {
      setIsBound(true)
    } else {
      setError(t('dialectNotDetected'))
    }
  }

  const handleProceed = () => {
    if (isBound) {
      onSuccess()
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen my-[-40px] px-4'>
      {' '}
      {/* ✅ Center on small screens */}
      <motion.div
        className='max-w-md w-full bg-white dark:bg-neutral-900 p-6 rounded-lg shadow text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className='text-xl font-bold mb-4 flex items-center justify-center gap-2'>
          <Mic className='w-6 h-6 text-blue-600' />
          {t('Dialect Detector')}
        </h2>
        <p className='mb-4 text-gray-700 dark:text-gray-300'>
          {t('Say a Greeting in Your Dialect')}
        </p>

        <div className='space-x-4 mb-4'>
          <button
            onClick={handleStart}
            disabled={isRecording}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50'
          >
            {t('startRecording')}
          </button>
          <button
            onClick={handleStop}
            disabled={!isRecording}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50'
          >
            {t('stopRecording')}
          </button>
        </div>

        {transcript && (
          <div className='bg-gray-100 dark:bg-neutral-800 p-3 rounded mb-2'>
            <p className='text-sm text-gray-800 dark:text-gray-100 italic'>
              {t('youSaid')}: “{transcript}”
            </p>
          </div>
        )}

        {error && <p className='text-red-600 mt-2 text-sm'>{error}</p>}

        {isBound && (
          <motion.button
            onClick={handleProceed}
            whileTap={{ scale: 0.95 }}
            className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            ✅ {t('proceed')}
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
