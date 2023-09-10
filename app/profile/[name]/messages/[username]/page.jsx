'use client'
import { useEffect, useState } from 'react'
import getConversation from '../getConversations'
import Image from 'next/image'
import styles from '@/app/profile/[name]/messages/messages.module.css'
import UserHeader from './UserHeader'
import WriteMsg from './WriteMsg'

const UserMessages = ({ params }) => {
  const { username, name } = params
  const [conversation, setConversation] = useState({ data: null, status: null })

  const fetchConversations = async () => {
    const fetched = await getConversation(name, username)
    setConversation({
      ...conversation,
      data: fetched?.data,
      status: fetched?.status
    })
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  return (
    <section className={styles.conversation}>
      <UserHeader username={username} />
      <ul>
        {conversation?.data?.map((conversation) => (
          <li
            key={conversation.message_Id}
            style={{
              alignItems:
                conversation?.sender_Username === name ? 'flex-end' : ''
            }}
          >
            {conversation?.sender_Username === name
              ? (
                <div className={styles.messagecontainer}>
                  <p className={styles.messagetextcontainer}>
                    {conversation.content}
                  </p>
                  <Image
                    src={conversation.sender_Profile_Picture}
                    alt={conversation.sender_Username}
                    width={50}
                    height={50}
                  />
                </div>
                )
              : (
                <div className={styles.messagecontainer}>
                  <Image
                    src={conversation.sender_Profile_Picture}
                    alt={conversation.sender_Username}
                    width={50}
                    height={50}
                  />
                  <p className={styles.messagetextcontainer}>
                    {conversation.content}
                  </p>
                </div>
                )}
          </li>
        ))}
      </ul>
      <WriteMsg receiver={username} />
    </section>
  )
}

export default UserMessages
