import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import { AuthProvider } from '@/hooks/useAuth'
import { Fetcher } from '@/hooks/useFetcher'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Social Network',
  description: 'Created by Martin Cardenas'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <title>Social Network</title>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Fetcher>
            {children}
          </Fetcher>
        </AuthProvider>
      </body>
    </html>
  )
}
