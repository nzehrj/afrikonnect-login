'use client'

export default function Dashboard({ onBackToLogin }) {
  return (
    <div
      className='p-8 text-center rounded-2xl shadow-lg mt-20'
      style={{
        background:
          'linear-gradient(rgba(50, 48, 48, 0.8), rgba(50, 48, 48, 0.8))',
      }}
    >
      <h1 className='text-2xl text-white font-semibold mb-4'>
        Welcome to the Afrikonnect App
      </h1>
      <button
        onClick={onBackToLogin}
        className='mt-4 px-4 py-2 bg-warm-sand hover:bg-soft-linen text-black rounded font-bold'
      >
        Back to Login
      </button>
    </div>
  )
}
