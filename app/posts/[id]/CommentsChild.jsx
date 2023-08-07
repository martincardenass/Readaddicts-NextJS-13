'use client'
import { usePathname } from 'next/navigation'

const CommentsChild = ({ children }) => {
  const pathname = usePathname()

  if (pathname.includes('/comments')) {
    return children
  }
}

export default CommentsChild
