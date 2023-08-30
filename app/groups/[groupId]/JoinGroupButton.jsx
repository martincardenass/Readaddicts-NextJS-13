import Button from '@/components/Button/Button'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

const JoinGroupButton = ({
  groupdId,
  members,
  joinGroup,
  leaveGroup,
  loading
}) => {
  const { user } = useAuth()
  const [msg, setMsg] = useState(null)

  const isUserInGroup = members?.some(
    (member) => member.user_Id === user?.user_Id
  )

  const handleClick = () => {
    if (isUserInGroup) {
      leaveGroup(groupdId)
      setMsg('You left the group')

      setTimeout(() => {
        setMsg(null)
      }, 2000)
    } else {
      joinGroup(groupdId)
      setMsg('You joined the group')

      setTimeout(() => {
        setMsg(null)
      }, 2000)
    }
  }

  return (
    <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div
        style={{ width: '120px' }}
        onClick={handleClick}
      >
        <Button
          text={isUserInGroup ? 'Leave Group' : 'Join Group'}
          width='120px'
          effectWidth='120px'
          effectHeight='120px'
          loading={loading}
        />
      </div>
      {msg && <p style={{ margin: 0, padding: 0 }}>{msg}</p>}
    </section>
  )
}

export default JoinGroupButton
