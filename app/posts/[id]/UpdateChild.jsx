'use client'
import { usePathname } from 'next/navigation'

const UpdateChild = ({ children }) => {
  const pathname = usePathname()

  if (pathname.includes('/edit')) {
    return children
  }
}

export default UpdateChild
