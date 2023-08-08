'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import styles from './comments.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useFetcher } from '@/hooks/useFetcher'
import { useRouter } from 'next/navigation'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))
const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const AddComent = ({ postId }) => {
  const [characters, setCharacters] = useState(0)
  const { createAComment, commentPosted, commentPostedResponse, commentsPost } =
    useFetcher()
  const { user } = useAuth()
  const formRef = useRef(null)
  const router = useRouter()

  const handleSubmit = useSubmitRef(formRef)

  const postComment = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    if (formData.content !== '') {
      createAComment(postId, formData.content)
    }
  }

  useEffect(() => {
    const status = commentsPost?.status
    if (status !== 400 && status !== null && status !== undefined) {
      router.push(`/posts/${postId}/comments`)
    }
  }, [commentsPost])

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    setCharacters(targetValue.length)
  }

  return (
    <>
      {commentPosted && commentsPost?.status === 200 && (
        <DynamicAlert message={commentPostedResponse} width='150px' />
      )}
      <section className={styles.addcommentcontainer}>
        <section className={styles.addcomment}>
          <Image
            src={user?.profile_Picture}
            alt={user?.username}
            width={75}
            height={75}
          />
          <div className={styles.commentinput}>
            <form ref={formRef} onSubmit={postComment}>
              <input
                type='text'
                name='content'
                placeholder='Leave a comment'
                onChange={handleCharacterCount}
              />
            </form>
            <div>
              <p
                style={{
                  color:
                    commentPostedResponse === '8 characters min'
                      ? 'red'
                      : 'black'
                }}
              >
                {commentPostedResponse}
              </p>
              <p style={{ color: characters === 255 ? 'red' : 'black' }}>
                {characters}/255
              </p>
            </div>
          </div>
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
