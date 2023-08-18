'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import styles from './comments.module.css'
import Image from 'next/image'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useFetcher } from '@/hooks/useFetcher'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'

const AddComent = ({ postId, parent, placeholderText, href }) => {
  const [characters, setCharacters] = useState(0)
  const [loading, setLoading] = useState(false)
  const {
    createAComment,
    commentPosted,
    commentPostedResponse,
    commentPostedStatus,
    commentsPost,
    updateCommentPostedResponse
  } = useFetcher()
  const { user } = useAuth()
  const formRef = useRef(null)
  const router = useRouter()

  const handleSubmit = useSubmitRef(formRef)

  const postComment = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    const content = formData.content

    if (content !== '') {
      if (content.length >= 8) {
        setLoading(true)
      }

      await createAComment(postId, formData.content, parent)
    }
  }

  useEffect(() => {
    if (commentPostedStatus === 200) {
      setLoading(false)
      setTimeout(() => {
        updateCommentPostedResponse(null)
      }, 2000)
    }
  }, [commentPostedStatus, commentPosted])

  useEffect(() => {
    const status = commentsPost?.status
    if (
      status !== 400 &&
      status !== null &&
      status !== undefined &&
      commentPosted !== false
    ) {
      router.push(href)
    }
  }, [commentsPost])

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    setCharacters(targetValue.length)
  }

  return (
    <section className={styles.addcommentcontainer}>
      <section className={styles.addcomment}>
        {user?.profile_Picture
          ? (
            <Image
              src={user.profile_Picture}
              alt={user.username}
              width={50}
              height={50}
            />
            )
          : (
            <div className={styles.nouser}>?</div>
            )}
        <div className={styles.commentinput}>
          <form ref={formRef} onSubmit={postComment}>
            <input
              type='text'
              name='content'
              placeholder={placeholderText}
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
          <Button
            text='Comment'
            backgroundColor='#ed2085'
            textColor='white'
            loading={loading}
          />
        </div>
      </section>
    </section>
  )
}

export default AddComent
