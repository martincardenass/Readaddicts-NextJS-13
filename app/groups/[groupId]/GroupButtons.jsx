import Button from '@/components/Button/Button'
import { useAuth } from '@/hooks/useAuth'
import styles from './groupid.module.css'
import { useState } from 'react'

const GroupButtons = ({
  groupdId,
  members,
  owner,
  joinGroup,
  leaveGroup,
  groupLoading,
  deletePost,
  update
}) => {
  const { user } = useAuth()

  const [toggleOptions, setToggleOptions] = useState(false)
  const [toggle, setToggle] = useState({
    delete: false,
    update: false
  })

  const isUserInGroup = members?.some(
    (member) => member?.user_Id === user?.user_Id
  )

  const isUserOwner = owner?.user_Id === user?.user_Id

  const handleJoinClick = async () => {
    if (isUserInGroup) return

    await joinGroup(groupdId)
  }

  const handleLeaveClick = async () => {
    if (!isUserInGroup) return

    await leaveGroup(groupdId)
  }

  const handleOptionsClick = () => {
    setToggleOptions(!toggleOptions)
    setToggle({ delete: false, update: false })
  }

  return (
    <>
      <section className={styles.options}>
        <div onClick={handleJoinClick}>
          <Button
            text={isUserInGroup || isUserOwner ? 'Joined' : 'Join group'}
            width='120px'
            backgroundColor={isUserInGroup ? 'rgb(0, 210, 255)' : ''}
            effectWidth='120px'
            effectHeight='120px'
            loading={groupLoading}
          />
        </div>
        {isUserInGroup
          ? (
            <section className={styles.optionsbuttons}>
              <div onClick={handleLeaveClick}>
                <Button
                  text='Leave group'
                  backgroundColor='red'
                  textColor='white'
                  width='120px'
                  effectWidth='120px'
                  effectHeight='120px'
                />
              </div>
            </section>
            )
          : isUserOwner
            ? (
              <div onClick={handleOptionsClick}>
                <Button
                  text={toggleOptions ? 'Close options' : 'Options  '}
                  width='120px'
                  effectWidth='120px'
                  effectHeight='120px'
                />
              </div>
              )
            : null}
      </section>
      {toggleOptions && (
        <section
          className={styles.optionsbuttons}
          style={{ marginTop: '1rem' }}
        >
          <div
            onClick={() =>
              setToggle({ ...toggle, delete: !toggle.delete, update: false })}
          >
            <Button
              text='Delete group'
              backgroundColor='red'
              textColor='white'
              width='120px'
              effectWidth='120px'
              effectHeight='120px'
            />
          </div>
          <div
            onClick={() =>
              setToggle({ ...toggle, update: !toggle.update, delete: false })}
          >
            <Button
              text='Manage group'
              width='120px'
              effectWidth='120px'
              effectHeight='120px'
            />
          </div>
        </section>
      )}
      {toggle.delete && deletePost}
      {toggle.update && update}
    </>
  )
}

export default GroupButtons
