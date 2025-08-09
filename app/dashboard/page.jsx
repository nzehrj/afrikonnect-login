'use client'

export default function Dashboard({ onBackToLogin }) {
  return (
    <div className='p-8 bg-#F4F4F3 text-center rounded-2xl shadow-lg'>
      <h1 className='text-2xl text-gray-950 font-bold mb-4'>
        Welcome to the Afrikonnect App
      </h1>
      <button
        onClick={onBackToLogin}
        className='mt-4 px-4 py-2 bg-blue-950 text-white rounded'
      >
        Back to Login
      </button>
    </div>
  )
}
