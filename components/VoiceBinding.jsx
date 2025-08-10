'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic } from 'lucide-react'
import CulturalQuote from './CulturalQuote'

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
    <>
      <CulturalQuote className='mb-6' />
      <div className='flex items-center justify-center mt-15 px-4'>
        <motion.div
          className='max-w-md w-full bg-ivory-white p-6 rounded-lg shadow text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className='text-xl font-bold mb-4 flex text-black items-center justify-center gap-2'>
            <Mic className='w-6 h-6 text-blue-600' />
            {t('Dialect Detector')}
          </h2>
          <p className='mb-4 text-black'>
            {t('Say a Greeting in Your Dialect')}
          </p>

          <div className='space-x-4 mb-4'>
            <button
              onClick={handleStart}
              disabled={isRecording}
              className='px-4 py-2 bg-forest-shade text-white rounded hover:bg-forest-deep disabled:opacity-50'
            >
              {t('Start Recording')}
            </button>
            <button
              onClick={handleStop}
              disabled={!isRecording}
              className='px-4 py-2 bg-mahogany-ember text-white rounded hover:bg-dark-garnet disabled:opacity-50'
            >
              {t('Stop Recording')}
            </button>
          </div>

          {transcript && (
            <div className='bg-sand-beige p-3 rounded mb-2'>
              <p className='text-sm text-gray-800 italic'>
                {t('You said')}: “{transcript}”
              </p>
            </div>
          )}

          {error && <p className='text-red-400 mt-2 text-sm'>{error}</p>}

          {isBound && (
            <motion.button
              onClick={handleProceed}
              whileTap={{ scale: 0.95 }}
              className='mt-4 bg-forest-shade text-white px-4 py-2 rounded hover:bg-forest-deep'
            >
              ✅ {t('Proceed')}
            </motion.button>
          )}
        </motion.div>
      </div>
    </>
  )
}
