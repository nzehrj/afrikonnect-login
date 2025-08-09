'use client'

import React from 'react'

export default function CenteredCard({ children }) {
  return (
    <div className='flex items-center justify-center min-h-screen px-4 lg:block lg:min-h-0'>
      <div className='w-full max-w-md'>{children}</div>
    </div>
  )
}
