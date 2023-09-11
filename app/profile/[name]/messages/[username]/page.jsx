'use client'
import styles from '@/app/profile/[name]/messages/messages.module.css'
import UserHeader from './UserHeader'
import WriteMsg from './WriteMsg'
import MessagesContainer from './MessagesContainer'
import { useFetcher } from '@/hooks/useFetcher'

const UserMessages = ({ params }) => {
  const { username, name } = params
  const { updatedMessagesChanged } = useFetcher()

  return (
    <section className={styles.conversation}>
      <UserHeader username={username} />
      <MessagesContainer
        name={name}
        username={username}
        updatedMessagesChanged={updatedMessagesChanged}
      />
      <WriteMsg
        receiver={username}
        updatedMessagesChanged={updatedMessagesChanged}
      />
    </section>
  )
}

export default UserMessages
