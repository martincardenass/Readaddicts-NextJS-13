import Button from '@/components/Button/Button'
import { useAuth } from '@/hooks/useAuth'

const JoinGroupButton = ({ groupdId, members, owner }) => {
  const { user } = useAuth()

  const isUserInGroup = members?.some(
    (member) => member.user_Id === user?.user_Id
  )

  const isUserOwner = owner?.user_Id === user?.user_Id

  const handleJoin = () => {
    if (isUserInGroup) {
      leaveGroup(groupdId)
    } else {
      joinGroup(groupdId)
    }
  }

  return (
    <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '120px' }}>
        {isUserOwner
          ? (
            <Button
              text='Delete group'
              width='120px'
              effectWidth='120px'
              backgroundColor='red'
              textColor='white'
              effectHeight='120px'
              // loading={loading}
              href={`/groups/${groupdId}/delete`}
            />
            )
          : (
            <div onClick={handleJoin}>
              <Button
                text={isUserInGroup ? 'Leave group' : 'Join group'}
                width='120px'
                effectWidth='120px'
                effectHeight='120px'
                // loading={loading}
              />
            </div>
            )}
      </div>
    </section>
  )
}

export default JoinGroupButton
