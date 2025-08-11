'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const quotes = [
  {
    text: 'Wisdom is like a baobab tree; no one individual can embrace it.',
    author: 'African Proverb',
  },
  {
    text: 'Even the best cooking pot will not produce food.',
    author: 'African Proverb',
  },
  {
    text: 'A single bracelet does not jingle.',
    author: 'African Proverb',
  },
  {
    text: 'If you want to go fast, go alone. If you want to go far, go together.',
    author: 'African Proverb',
  },
  {
    text: 'Rain does not fall on one roof alone.',
    author: 'African Proverb',
  },
  {
    text: 'No shortcuts exist to the top of a palm tree.',
    author: 'African Proverb',
  },
  {
    text: 'All monkeys cannot hang from the same branch.',
    author: 'African Proverb',
  },
  {
    text: 'Don’t think there are no crocodiles just because the water is calm.',
    author: 'African Proverb',
  },
  {
    text: 'If there is no enemy within, the enemy outside can do no harm.',
    author: 'African Proverb',
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
      className='w-full max-w-xl mx-auto mt-6 p-6 rounded-xl shadow text-center'
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <blockquote className='text-lg italic text-white mb-2'>
        “{quote.text}”
      </blockquote>
      <p className='text-sm font-medium text-white'>— {quote.author}</p>
    </motion.div>
  )
}
