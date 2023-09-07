'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRef, useState } from 'react'
import AddNewPost from './posts/new/page'
import Login from '@/components/Login/Login'
import IntersectedContent from '@/utility/intersectionObserver'
import getPosts from './getPosts'

const HomePage = () => {
  const { user } = useAuth()

  const ref = useRef(null)

  const [posts, setPosts] = useState({ data: [], status: null })
  const [page, setPage] = useState(1)

  const fetchPosts = async () => {
    // * Gets 10 posts of page 1 (to start with)
    const data = await getPosts(page, 10)

    setPosts((prevPosts) => ({
      ...posts,
      data: [...prevPosts.data, ...data?.data],
      status: data?.status
    }))

    setPage(page + 1)
  }

  if (!user) return <Login />

  if (user) {
    return (
      <>
        <AddNewPost user={user} placeholder='New post' />
        <IntersectedContent reference={ref} func={fetchPosts} posts={posts} />
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
