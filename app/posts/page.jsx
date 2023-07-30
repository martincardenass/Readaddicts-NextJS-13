'use client'
import { useRouter } from 'next/navigation'
const Unreachable = () => {
  const router = useRouter()
  router.push('/')
}

export default Unreachable
