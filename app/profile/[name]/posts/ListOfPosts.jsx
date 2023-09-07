'use client'
import { useState, useRef } from 'react'
import IntersectedPosts from '@/utility/intersectionObserver'
import getUserPosts from './getUserPosts'

const ListOfPosts = ({ name }) => {
  const [posts, setPosts] = useState({ data: [], status: null })
  const [page, setPage] = useState(1)

  const ref = useRef(null)

  const fetchUserPosts = async () => {
    const data = await getUserPosts(page, 10, name)

    setPosts((prevPosts) => ({
      ...posts,
      data: [...prevPosts.data, ...data?.data],
      status: data?.status
    }))

    setPage(page + 1)
  }

  return (
    <>
      <IntersectedPosts reference={ref} func={fetchUserPosts} posts={posts} />
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

export default ListOfPosts
