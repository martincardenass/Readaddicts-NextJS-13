'use client'
import styles from '@/app/profile/[name]/messages/messages.module.css'
import UserHeader from './UserHeader'
import WriteMsg from './WriteMsg'
import MessagesContainer from './MessagesContainer'
import { MsgProvider } from '@/context/useMsg'

const UserMessages = ({ params }) => {
  const { username, name } = params

  return (
    <section className={styles.conversation}>
      <UserHeader username={username} />
      <MsgProvider>
        <MessagesContainer name={name} username={username} />
        <WriteMsg receiver={username} />
      </MsgProvider>
    </section>
  )
}

export default UserMessages
