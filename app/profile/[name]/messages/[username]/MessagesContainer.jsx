import { useEffect, useRef, useState } from 'react'
import styles from '../messages.module.css'
import IntersectedContent from '@/utility/intersectionObserver'
import getConversation from '../getConversations'
import { useMsg } from '@/context/useMsg'

const MessagesContainer = ({ name, username }) => {
  const [messages, setMessages] = useState({
    data: [],
    status: null,
    initialFetch: false
  })
  const [msg, setMsg] = useState('Load more...')
  const [page, setPage] = useState(1)

  const { newMessage, setNewMessage } = useMsg()

  const ref = useRef(null)
  const scrolleable = useRef(null)

  const fetchUserMessages = async () => {
    if (msg === 'Load more...') {
      const data = await getConversation(page, 10, name, username)

      // * Avoid fetching again and again when the new data was already empty
      if (data?.data.length === 0) { setMsg(`This is the end of your conversation with ${username}`) }

      setMessages((prevMessages) => ({
        ...messages,
        data: [...data?.data, ...prevMessages.data],
        status: data?.status,
        initialFetch: true
      }))

      setPage(page + 1)
    }
  }

  useEffect(() => {
    if (newMessage.sent) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        data: [...prevMessages.data, newMessage.data]
      }))

      setNewMessage({
        ...newMessage,
        sent: false
      })
    }
  }, [newMessage.sent])

  // * scroll to the bottom of the messages on the messages initial fetch
  useEffect(() => {
    const scroll = scrolleable.current
    scroll.scrollTop = scroll.scrollHeight
  }, [messages.initialFetch])

  // * scroll back a little bit after we load the subsequent messages
  useEffect(() => {
    const scroll = scrolleable.current
    scroll.scrollTop += 50
  }, [fetchUserMessages])

  return (
    <div ref={scrolleable} className={styles.scrolleable}>
      <span ref={ref}>{msg}</span>
      <IntersectedContent
        reference={ref}
        func={fetchUserMessages}
        messages={messages?.data}
      />
    </div>
  )
}

export default MessagesContainer
