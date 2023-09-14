'use client'
import UserHeader from '../[username]/UserHeader'
import { MsgProvider } from '@/context/useMsg'
import MessagesContainer from '../[username]/MessagesContainer'
import WriteMsg from '../[username]/WriteMsg'
import { useAuth } from '@/context/useAuth'
import styles from '../messages.module.css'

const SendMessageToUserPage = (props) => {
  const { name } = props.params
  const { user } = useAuth()

  if (user !== null) {
    return (
      <section className={styles.conversation}>
        <UserHeader username={name} />
        <MsgProvider>
          <MessagesContainer name={name} username={user.username} />
          <WriteMsg receiver={name} />
        </MsgProvider>
      </section>
    )
  } else {
    return <h1>Must be logged</h1>
  }
}

export default SendMessageToUserPage
