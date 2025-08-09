'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Sprout,
  Hammer,
  HeartPulse,
  BookOpen,
} from 'lucide-react'

const roles = [
  { id: 'trader', label: 'Trader', icon: ShoppingCart },
  { id: 'farmer', label: 'Farmer', icon: Sprout },
  { id: 'craftsperson', label: 'Craftsperson', icon: Hammer },
  { id: 'healer', label: 'Healer', icon: HeartPulse },
  { id: 'storyteller', label: 'Storyteller', icon: BookOpen },
]

export default function RoleSelector({ onSuccess }) {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleSelect = (roleId) => {
    setSelectedRole(roleId)
  }

  const handleContinue = () => {
    if (selectedRole) {
      onSuccess(selectedRole)
    }
  }

  return (
    <motion.div
      className='w-full max-w-md mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-gray-900'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className='text-lg font-medium mb-4 text-center text-gray-800 dark:text-white'>
        What best describes your role?
      </h2>
      <div className='space-y-3'>
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className={`flex items-center gap-3 w-full py-2 px-3 rounded-lg text-left border transition-all ${
                selectedRole === role.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{role.label}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedRole}
        className='mt-6 w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50'
      >
        Continue
      </button>
    </motion.div>
  )
}
