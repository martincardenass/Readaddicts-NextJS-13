'use client'
import Button from '@/components/Button/Button'
import { useAuth } from '@/context/useAuth'

const UserButton = ({ current }) => {
  const { user } = useAuth()

  const isUser = current === user.username

  if (!isUser) {
    return (
      <Button
        text='Send message'
        width='125px'
        backgroundColor='rgb(0, 210, 255)'
        textColor='white'
        href={`/profile/${current}/messages/send`}
      />
    )
  }
}

export default UserButton
