'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Posts from '@/app/posts/Posts'

const GroupPosts = () => {
  const params = useParams()
  const { groupPosts, fetchGroupPosts, changed } = useFetcher()

  useEffect(() => {
    fetchGroupPosts(params.groupId)
  }, [changed])

  const posts = groupPosts?.data
  const status = groupPosts?.status

  return (
    <Posts posts={posts} postsStatus={status} />
  )
}

export default GroupPosts
