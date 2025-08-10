import '../utils/i18n'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Afrikonnect Login',
  description: 'Culturally inspired login UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white min-h-screen`}
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/african.JPEG')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        <main className='flex item-center justify-center min-h-screen'>
          {children}
        </main>
      </body>
    </html>
  )
}
