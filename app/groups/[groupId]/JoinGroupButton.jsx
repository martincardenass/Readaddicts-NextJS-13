'use client'
import Button from '@/components/Button/Button'
import groupJoinLeave from './groupLeaverAndJoiner'
import { useAuth } from '@/hooks/useAuth'

const JoinGroupButton = ({ groupdId, members }) => {
  const { user } = useAuth()

  const handleJoinGroup = async () => {
    const data = await groupJoinLeave(groupdId, 'POST')
  }

  const handleLeaveGroup = async () => {
    const data = await groupJoinLeave(groupdId, 'DELETE')
  }

  const isUserInGroup = members.some(
    (member) => member.user_Id === user?.user_Id
  )

  return (
    <div onClick={isUserInGroup ? handleLeaveGroup : handleJoinGroup}>
      <Button
        text={isUserInGroup ? 'Leave Group' : 'Join Group'}
        width='120px'
        effectWidth='120px'
        effectHeight='120px'
      />
    </div>
  )
}

export default JoinGroupButton
