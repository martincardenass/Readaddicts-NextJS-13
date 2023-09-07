'use client'
import { useEffect, useState } from 'react'
import getUserPosts from './getUserPosts'
import dynamic from 'next/dynamic'

const DynamicPosts = dynamic(() => import('@/app/posts/Posts'), {
  loading: () => <h1 style={{ textAlign: 'center' }}>Loading...</h1>
})

const ListOfPosts = ({ name }) => {
  const [posts, setPosts] = useState({ data: null, status: null })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserPosts(name)
      setPosts({ ...posts, data: data.data, status: data.status })
    }

    fetchData()
  }, [name])

  if (posts.status === 200) {
    return <DynamicPosts posts={posts.data} postsStatus={posts.status} />
  }

  if (posts.status === 404) {
    return (
      <h1 style={{ textAlign: 'center', fontWeight: 400 }}>
        {name} has no posts yet
      </h1>
    )
  }
}

export default ListOfPosts
