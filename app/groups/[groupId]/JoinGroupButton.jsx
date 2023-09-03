import Button from '@/components/Button/Button'
import { useAuth } from '@/hooks/useAuth'
import styles from './groupid.module.css'

const JoinGroupButton = ({
  groupdId,
  members,
  owner,
  joinGroup,
  leaveGroup,
  groupLoading
}) => {
  const { user } = useAuth()

  const isUserInGroup = members?.some(
    (member) => member?.user_Id === user?.user_Id
  )

  const isUserOwner = owner?.user_Id === user?.user_Id

  const handleJoinClick = async () => {
    if (isUserInGroup) return

    await joinGroup(groupdId)
  }

  return (
    <section className={styles.options}>
      {isUserOwner
        ? (
          <Button
            text='Delete group'
            width='120px'
            effectWidth='120px'
            backgroundColor='red'
            textColor='white'
            effectHeight='120px'
            loading={groupLoading}
            href={`/groups/${groupdId}/delete`}
          />
          )
        : (
          <section className={styles.optionsbuttons}>
            <div onClick={handleJoinClick}>
              <Button
                text={isUserInGroup ? 'Joined' : 'Join group'}
                width='120px'
                backgroundColor={isUserInGroup ? 'rgb(0, 210, 255)' : ''}
                effectWidth='120px'
                effectHeight='120px'
                loading={groupLoading}
              />
            </div>
            {isUserInGroup && (
              <Button
                text='Options'
                width='120px'
                effectWidth='120px'
                effectHeight='120px'
                href={`/groups/${groupdId}/manage`}
              />
            )}
          </section>
          )}
    </section>
  )
}

export default JoinGroupButton
