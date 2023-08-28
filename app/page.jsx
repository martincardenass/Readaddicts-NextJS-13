'use client'
import getPosts from './getPosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicLogin = dynamic(() => import('@/components/Login/Login'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const DynamicPosts = dynamic(() => import('./posts/Posts'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const DynamicAddPost = dynamic(() => import('./posts/new/page'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const HomePage = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [postsStatus, setPostsStatus] = useState(null)
  // * ref and isIntersecting for infinite scroll using IntersectionObserver API
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [page, setPage] = useState(1)

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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  useEffect(() => {
    if (isIntersecting) {
      const fetchPosts = async () => {
        const postsData = await getPosts(page, 5)

        setPostsStatus(postsData?.status)

        setPosts((prevPosts) => [...prevPosts, ...postsData.data])
        setPage(page + 1)
      }

      fetchPosts()
    }
  }, [isIntersecting])

  if (!user) return <DynamicLogin />

  if (user) {
    return (
      <>
        <DynamicAddPost user={user} />
        <DynamicPosts posts={posts} postsStatus={postsStatus} />
        <p
          ref={ref}
          style={{
            textAlign: 'center',
            marginTop: '-2rem',
            userSelect: 'none'
          }}
        >
          .
        </p>
      </>
    )
  }
}

export default HomePage
