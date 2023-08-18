'use client'
import { usePathname } from 'next/navigation'

const ImagesChild = ({ children }) => {
  const pathname = usePathname()

  if (pathname.includes('/image')) {
    return children
  }
}

export default ImagesChild
