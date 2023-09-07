'use client'
import getUserComments from './getUserComments'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicComments = dynamic(
  () => import('@/app/posts/[id]/@comments/Comments'),
  {
    loading: () => (
      <h2 style={{ textAlign: 'center', fontWeight: 500 }}>
        Loading comments...
      </h2>
    )
  }
)

const ListOfComents = ({ name }) => {
  const [comments, setComments] = useState({ data: [], status: null })

  const fetchData = async () => {
    const data = await getUserComments(name)

    setComments({
      ...comments,
      data: data?.data,
      status: data?.status
    })
  }

  useEffect(() => {
    fetchData()
  }, [name])

  if (comments.status === 200) return <DynamicComments comments={comments?.data} />

  if (comments.status === 404) {
    return (
      <h1 style={{ textAlign: 'center', fontWeight: 500 }}>
        No comments. Yet.
      </h1>
    )
  }
}

export default ListOfComents
