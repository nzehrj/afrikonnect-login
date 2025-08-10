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
      className='w-full max-w-md mx-auto p-6 rounded-xl shadow-md border-1 border-parchment-cream'
      style={{
        background:
          'linear-gradient(rgba(96, 93, 93, 0.5), rgba(96, 93, 93, 0.5))',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className='text-lg font-medium mb-4 text-center text-white'>
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
                  ? 'bg-deep-slate-teal text-white border-1 border-gray-300'
                  : 'bg-[var(--color-overlay-gray)] text-white border-gray-300 hover:bg-[var(--color-overlay-gray-hover)]'
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
        className='mt-6 w-full py-3 px-4 bg-forest-shade hover:bg-forest-deep text-white font-semibold rounded-lg disabled:opacity-50'
      >
        Continue
      </button>
    </motion.div>
  )
}
