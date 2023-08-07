'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import createComment from './postComment'
import styles from './comments.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useSubmitRef } from '@/utility/formSubmitRef'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))
const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const AddComent = ({ postId }) => {
  const { user } = useAuth()
  const formRef = useRef(null)
  const [response, setResponse] = useState('')
  const [commentPosted, setCommentPosted] = useState(false)

  const handleSubmit = useSubmitRef(formRef)

  const postComment = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    // * Only make a request if content is sent
    if (formData.content !== '') {
      const data = await createComment(postId, formData.content)
      setResponse(data)
      setCommentPosted(true)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCommentPosted(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [response, commentPosted])

  return (
    <>
      {commentPosted && <DynamicAlert message={response.data} width='150px' />}
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
          <div onClick={handleSubmit}>
            <DynamicButton
              text='Comment'
              backgroundColor='#ed2085'
              textColor='white'
            />
          </div>
        </section>
      </section>
    </>
  )
}

export default AddComent
