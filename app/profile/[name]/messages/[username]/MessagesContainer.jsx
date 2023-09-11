import { useEffect, useRef, useState } from 'react'
import styles from '../messages.module.css'
import IntersectedContent from '@/utility/intersectionObserver'
import { useFetcher } from '@/hooks/useFetcher'

const MessagesContainer = ({ name, username, updatedMessagesChanged }) => {
  const { messages, messagesPage, fetchMessages, messagesChanged, initialMessageFetch } =
    useFetcher()

  const ref = useRef(null)
  const scrolleable = useRef(null)

  const fetchUserMessages = async () => {
    await fetchMessages(messagesPage, 10, name, username)
  }

  // * scroll to the bo om of the messages
  useEffect(() => {
    const scroll = scrolleable.current
    scroll.scrollTop = scroll.scrollHeight
  }, [initialMessageFetch])

  // * scroll back a little bit after we load the messages
  useEffect(() => {
    const scroll = scrolleable.current
    scroll.scrollTop += 50
  }, [fetchMessages])

  return (
    <div ref={scrolleable} className={styles.scrolleable}>
      <span ref={ref}>Load more...</span>
      <IntersectedContent
        reference={ref}
        func={fetchUserMessages}
        messages={messages?.data}
      />
    </div>
  )
}

export default MessagesContainer
