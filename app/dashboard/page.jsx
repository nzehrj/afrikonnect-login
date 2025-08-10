'use client'

export default function Dashboard({ onBackToLogin }) {
  return (
    <div
      className='p-8 text-center rounded-2xl shadow-lg border-2 border-white mt-25'
      style={{
        background:
          'linear-gradient(rgba(96, 93, 93, 0.5), rgba(96, 93, 93, 0.5))',
      }}
    >
      <h1 className='text-2xl text-parchment font-bold mb-4'>
        Welcome to the Afrikonnect App
      </h1>
      <button
        onClick={onBackToLogin}
        className='mt-4 px-4 py-2 bg-forest-deep hover:bg-olive-dark text-parchment'
      >
        Back to Login
      </button>
    </div>
  )
}
