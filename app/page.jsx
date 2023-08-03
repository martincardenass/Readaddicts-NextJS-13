'use client'
import getPosts from './getPosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import createPost from './posts/new/createPost'

const DynamicLogin = dynamic(() => import('@/components/Login/Login'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicPosts = dynamic(() => import('./posts/Posts'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicAddPost = dynamic(() => import('./posts/new/page'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const HomePage = () => {
  const { userStatusCode, user } = useAuth()
  const [posts, setPosts] = useState(null)
  const [postsStatus, setPostsStatus] = useState(null)
  const [msg, setMsg] = useState(null)
  const [posted, setPosted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts(1, 20)
      setPosts(postsData.data)
      setPostsStatus(postsData.status)
    }
    fetchPosts()
  }, [])

  const handlePost = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    if (formData.content !== '') {
      const data = await createPost(formData.content)
      setPosted(true)
      setShowAlert(true)
      setMsg(data)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
      setPosted(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [posted, showAlert])

  return (
    <>
      {userStatusCode === 404 && <DynamicLogin />}
      {userStatusCode === 200 && (
        <>
          {showAlert && <DynamicAlert message='Post added' />}
          <DynamicAddPost
            user={user}
            handlePost={handlePost}
            msg={msg}
            posted={posted}
          />
          <DynamicPosts posts={posts} postsStatus={postsStatus} />
        </>
      )}
    </>
  )
}

export default HomePage
