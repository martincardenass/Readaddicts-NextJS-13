'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useAuth } from '@/hooks/useAuth'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Posts from '@/app/posts/Posts'
import Link from 'next/link'

const GroupPosts = () => {
  const params = useParams()
  const { user } = useAuth()
  const { group, groupPosts, fetchGroupPosts, changed } = useFetcher()

  useEffect(() => {
    fetchGroupPosts(params.groupId)
  }, [changed])

  const posts = groupPosts?.data
  const status = groupPosts?.status

  const isUserMember = group?.data?.members.some(
    (member) => member?.user_Id === user?.user_Id
  )

  const isUserOwner = group?.data?.owner?.user_Id === user?.user_Id

  if (isUserMember || isUserOwner) {
    if (posts?.length > 0) {
      return <Posts posts={posts} postsStatus={status} />
    }

    if (posts === undefined) {
      return <h3>No posts. Yet.</h3>
    }
  } else if (user === null) {
    return (
      <p>
        Are you a member of {group?.data?.group_Name}?{' '}
        <Link href='/'>Login</Link>
      </p>
    )
  } else if (!isUserMember) {
    return (
      <p>
        To see the posts of {group?.data?.group_Name} you must be a member.{' '}
      </p>
    )
  }
}

export default GroupPosts
