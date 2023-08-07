'use client'
import { usePathname } from 'next/navigation'

const DeleteChild = ({ children }) => {
  const pathname = usePathname()

  if (pathname.includes('/delete')) {
    return children
  }
}

export default DeleteChild
