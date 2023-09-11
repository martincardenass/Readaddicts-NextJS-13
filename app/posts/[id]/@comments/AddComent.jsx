'use client'
import { useAuth } from '@/context/useAuth'
import { useEffect, useRef, useState } from 'react'
import styles from './comments.module.css'
import Image from 'next/image'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useFetcher } from '@/context/useFetcher'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import createComment from './postComment'

const AddComent = ({ postId, parent, placeholderText }) => {
  const [characters, setCharacters] = useState(0)
  const [newComment, setNewComment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  const { updateCommentPostedResponse, commentPosted } = useFetcher()
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
        const data = await createComment(postId, formData.content, parent)

        if (data?.status === 200) {
          updateCommentPostedResponse(true)
          setNewComment(data)
          setMsg('Comment posted')
        }

        if (data?.status === undefined) {
          setMsg('Something went wrong')
          setTimeout(() => {
            ;['token', 'user'].forEach((item) =>
              window.localStorage.removeItem(item)
            )
            window.location.reload()
          }, 2000)
        }
      } else {
        setMsg('Min 8 characters')
      }
    } else {
      setMsg('Comment cannot be empty')
    }
  }

  useEffect(() => {
    if (newComment?.status === 200) {
      setLoading(false)
      setTimeout(() => {
        updateCommentPostedResponse(false)
        setMsg('')
      }, 2000)
    }
  }, [newComment, commentPosted])

  useEffect(() => {
    const status = newComment?.status
    if (
      status !== 400 &&
      status !== null &&
      status !== undefined &&
      newComment !== false
    ) {
      router.push(`/posts/${postId}/comments/${newComment?.data}`)
    }
  }, [newComment])

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
                color: msg === 'Min 8 characters' ? 'red' : 'black'
              }}
            >
              {msg}
            </p>
            <p style={{ color: characters === 255 ? 'red' : 'black' }}>
              {characters}/255
            </p>
          </div>
        </div>
        <div onClick={handleSubmit}>
          <Button
            text='Comment'
            backgroundColor='rgb(0, 210, 255)'
            textColor='white'
            loading={loading}
          />
        </div>
      </section>
    </section>
  )
}

export default AddComent
