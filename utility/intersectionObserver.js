import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicPosts = dynamic(() => import('@/app/posts/Posts'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const DynamicComments = dynamic(() => import('@/app/posts/[id]/@comments/Comments'))

const DynamicMessages = dynamic(() => import('@/app/profile/[name]/messages/[username]/Messages'))

const IntersectedContent = ({ reference, func, posts, comments, messages }) => {
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

  if (posts) return <DynamicPosts posts={posts?.data} postsStatus={posts?.status} />

  if (comments) return <DynamicComments comments={comments?.data} />

  if (messages) return <DynamicMessages messages={messages} />
}

export default IntersectedContent
