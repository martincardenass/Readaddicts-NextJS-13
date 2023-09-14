'use client'
import styles from './user.module.css'
import { useAuth } from '@/context/useAuth'
import Button from '@/components/Button/Button'
import Link from 'next/link'

const Header = ({ userdata }) => {
  const { user } = useAuth()

  return (
    <span className={styles.flexor}>
      <h3>
        <Link href={`/profile/${userdata.username}`}>
          {userdata.first_Name} {userdata.last_Name}
        </Link>
      </h3>
      <h2>
        <Link href={`/profile/${userdata.username}`}>@{userdata.username}</Link>
      </h2>
      {/* If logged user Id its different from the user profile we are at */}
      {userdata?.user_Id !== user?.user_Id && (
        <Button
          text='Send message'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          width='135px'
          href={`/profile/${userdata?.username}/messages/send`}
        />
      )}
      {userdata?.user_Id === user?.user_Id && (
        <Button
          text='Messages'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          width='110px'
          href={`/profile/${user.username}/messages`}
        />
      )}
    </span>
  )
}

export default Header
