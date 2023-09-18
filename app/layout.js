import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { AuthProvider } from '@/context/useAuth'
import { Fetcher } from '@/context/useFetcher'

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
          <div style={{ flex: 1 }}>
            <Navbar />
            <Fetcher>
              {children}
            </Fetcher>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
