'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRef, useState } from 'react'
import createComment from './postComment'
import styles from './comments.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const AddComent = ({ postId }) => {
  const { user } = useAuth()
  const formRef = useRef(null)
  const [response, setResponse] = useState('')

  const postComment = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    // * Only make a request if content is sent
    if (formData.content !== '') {
      const data = await createComment(postId, formData.content)
      setResponse(data)
    }
  }

  const formSubmitFromRef = (e) => {
    e.preventDefault()
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  console.log(response) // !!!!!!!!!!

  return (
    <section className={styles.addcommentcontainer}>
      <section className={styles.addcomment}>
        <Image
          src={user?.profile_Picture}
          alt={user?.username}
          width={50}
          height={50}
        />
        <form ref={formRef} onSubmit={postComment}>
          <input type='text' name='content' placeholder='Write a comment' />
        </form>
        <div onClick={formSubmitFromRef}>
          <DynamicButton
            text='Comment'
            backgroundColor='#ed2085'
            textColor='white'
          />
        </div>
      </section>
    </section>
  )
}

export default AddComent
