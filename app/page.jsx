'use client'
import Login from '@/components/Login/Login'
import Posts from './posts/Posts'
import getPosts from './getPosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const { userStatusCode } = useAuth()
  const [posts, setPosts] = useState(null)
  const [postsStatus, setPostsStatus] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts(1, 20)
      setPosts(postsData.data)
      setPostsStatus(postsData.status)
    }
    fetchPosts()
  }, [])

  return (
    <>
      {userStatusCode === 404 && (<Login />)}
      {userStatusCode === 200 && (<Posts posts={posts} postsStatus={postsStatus} />)}
    </>
  )
}

export default HomePage
