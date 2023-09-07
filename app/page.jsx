'use client'
import getPosts from './getPosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import AddNewPost from './posts/new/page'
import Login from '@/components/Login/Login'

const DynamicPosts = dynamic(() => import('./posts/Posts'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const HomePage = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [postsStatus, setPostsStatus] = useState(null)

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
        const postsData = await getPosts(page, 10)

        setPostsStatus(postsData?.status)

        setPosts((prevPosts) => [...prevPosts, ...postsData.data])
        setPage(page + 1)
      }

      fetchPosts()
    }
  }, [isIntersecting])

  if (!user) return <Login />

  if (user) {
    return (
      <>
        <AddNewPost user={user} placeholder='New post' />
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
