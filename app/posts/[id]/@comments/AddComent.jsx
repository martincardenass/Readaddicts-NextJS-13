'use client'
import { useAuth } from '@/context/useAuth'
import { useEffect, useRef, useState } from 'react'
import styles from './comments.module.css'
import Image from 'next/image'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import createComment from './postComment'
import Alert from '@/components/Alert/Alert'

const AddComent = ({ postId, parent, placeholderText }) => {
  const [characters, setCharacters] = useState(0)
  const [newComment, setNewComment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({
    text: null,
    status: null,
    backgroundColor: null,
    color: null,
    width: null
  })

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
          setNewComment(data)
          setLoading(false)
          setMsg({
            ...msg,
            text: 'Comment posted',
            backgroundColor: 'white',
            width: '125px',
            color: 'black',
            status: true
          })

          setTimeout(() => {
            setMsg((prevMsg) => ({
              ...prevMsg,
              status: false
            }))
          }, 5000)
        }

        if (data?.status === undefined) {
          setLoading(false)
          setTimeout(() => {
            setMsg({
              ...msg,
              text: 'Something went wrong',
              backgroundColor: 'red',
              color: 'white',
              width: '150px',
              status: false
            })
            ;['token', 'user'].forEach((item) =>
              window.localStorage.removeItem(item)
            )
            window.location.reload()
          }, 500)
        }
      } else {
        setLoading(false)
        setMsg({
          ...msg,
          text: 'Comment must be at least 8 characters long.',
          backgroundColor: 'red',
          color: 'white',
          width: '325px',
          status: true
        })

        setTimeout(() => {
          setMsg((prevMsg) => ({
            ...prevMsg,
            status: false
          }))
        }, 5000)
      }
    } else {
      setLoading(false)
      setMsg({
        ...msg,
        text: 'Comment cannot be empty.',
        backgroundColor: 'red',
        color: 'white',
        width: '210px',
        status: true
      })

      setTimeout(() => {
        setMsg((prevMsg) => ({
          ...prevMsg,
          status: false
        }))
      }, 5000)
    }
  }

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
        <Alert
          message={msg.text}
          ready={msg.status}
          backgroundColor={msg.backgroundColor}
          color={msg.color}
          width={msg.width}
        />
      </section>
    </section>
  )
}

export default AddComent
