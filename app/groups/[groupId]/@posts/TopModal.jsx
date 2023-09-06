'use client'
import AddNewPost from '@/app/posts/new/page'
import { useAuth } from '@/hooks/useAuth'
import { useFetcher } from '@/hooks/useFetcher'

const TopModal = () => {
  const { user } = useAuth()
  const { group } = useFetcher()

  if (user) {
    return (
      <AddNewPost
        user={user}
        placeholder={`New post for ${group?.data?.group_Name}`}
        groupId={group?.data?.group_Id}
      />
    )
  }
}

export default TopModal
