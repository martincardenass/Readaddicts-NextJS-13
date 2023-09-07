'use client'
import { useState, useRef } from 'react'
import IntersectedContent from '@/utility/intersectionObserver'
import getUserPosts from './getUserPosts'

const ListOfPosts = ({ name }) => {
  const [posts, setPosts] = useState({ data: [], status: null })
  const [page, setPage] = useState(1)

  const ref = useRef(null)

  const fetchUserPosts = async () => {
    const data = await getUserPosts(page, 10, `User/${name}/posts`)

    setPosts((prevPosts) => ({
      ...posts,
      data: [...prevPosts.data, ...data?.data],
      status: data?.status
    }))

    setPage(page + 1)
  }

  return (
    <>
      <IntersectedContent reference={ref} func={fetchUserPosts} posts={posts} />
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
