import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicPosts = dynamic(() => import('@/app/posts/Posts'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const IntersectedPosts = ({ reference, func, posts }) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const handleIntersection = (entries) => {
    const [entry] = entries
    setIsIntersecting(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(handleIntersection, options)

    if (reference.current) {
      observer.observe(reference.current)
    }

    return () => {
      if (reference.current) {
        observer.unobserve(reference.current)
      }
    }
  }, [reference, options])

  useEffect(() => {
    if (isIntersecting) {
      func()
    }
  }, [isIntersecting])

  return <DynamicPosts posts={posts?.data} postsStatus={posts?.status} />
}

export default IntersectedPosts
