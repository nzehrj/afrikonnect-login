'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const quotes = [
  {
    text: 'Wisdom is like a baobab tree; no one individual can embrace it.',
    author: 'Akan Proverb',
  },
  {
    text: 'Even the best cooking pot will not produce food.',
    author: 'African Proverb',
  },
  {
    text: 'A single bracelet does not jingle.',
    author: 'Congolese Proverb',
  },
  {
    text: 'If you want to go fast, go alone. If you want to go far, go together.',
    author: 'African Proverb',
  },
  {
    text: 'Rain does not fall on one roof alone.',
    author: 'Cameroonian Proverb',
  },
]

export default function CulturalQuote() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }, [])

  if (!quote) return null

  return (
    <motion.div
      className='w-full max-w-xl mx-auto mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow text-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <blockquote className='text-lg italic text-gray-700 dark:text-gray-200 mb-2'>
        “{quote.text}”
      </blockquote>
      <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
        — {quote.author}
      </p>
    </motion.div>
  )
}
