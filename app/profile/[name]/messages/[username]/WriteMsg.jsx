import styles from '../messages.module.css'
import Image from 'next/image'
import { useAuth } from '@/context/useAuth'
import Button from '@/components/Button/Button'
import sendMessage from './sendMessage'
import { useRef, useState } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'
import { useMsg } from '@/context/useMsg'

// * receiver its the person we are chatting with
const WriteMsg = ({ receiver }) => {
  const { newMessage, setNewMessage } = useMsg()
  const formRef = useRef(null)
  const inputRef = useRef(null)
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = useSubmitRef(formRef)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const content = formData.get('content')

    if (content) {
      setLoading(true)
      const res = await sendMessage(receiver, formData)
      if (res.status === 200) {
        // * set the response (which is the sent message object) to the context
        setNewMessage({
          ...newMessage,
          data: res?.data,
          status: res?.status,
          sent: true
        })

        // * Clear the input content
        inputRef.current.value = ''

        setSent(true)
        setTimeout(() => {
          setSent(false)
        }, 3000)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }

  return (
    <section className={styles.writemsg}>
      <Image
        src={user?.profile_Picture}
        alt={user?.username}
        width={75}
        height={75}
      />
      <form ref={formRef} onSubmit={handleSendMessage}>
        <input
          ref={inputRef}
          type='text'
          placeholder='Write a message...'
          name='content'
        />
      </form>
      <div onClick={handleSubmit}>
        <Button
          text='Send'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          width='75px'
          loading={loading}
        />
      </div>
      <Alert
        message='Message has been sent'
        ready={sent}
        backgroundColor='rgb(0, 210, 255)'
        width='175px'
        color='white'
      />
    </section>
  )
}

export default WriteMsg
