'use client'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import createComment from './postComment'
import styles from './comments.module.css'
import Image from 'next/image'

const AddComent = ({ postId }) => {
  const { user } = useAuth()
  const [toggle, setToggle] = useState(false)
  const [response, setResponse] = useState('')

  const handleClick = () => {
    setToggle(!toggle)
  }

  const postComment = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    // * Only make a request if content is sent
    if (formData.content !== '') {
      const data = await createComment(postId, formData.content)
      setResponse(data)
    }
  }

  console.log(response) // !!!!!!!!!!

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {!toggle && (
        <span className={styles.replyparagraph} onClick={handleClick}>
          Leave a comment
        </span>
      )}
      {toggle && (
        <section className={styles.addcommentcontainer}>
          <p>
            Posting as <div>&nbsp;{user?.username}</div>
          </p>
          <section className={styles.addcomment}>
            <Image
              src={user?.profile_Picture}
              alt={user?.username}
              width={50}
              height={50}
            />
            <form onSubmit={postComment}>
              <input type='text' name='content' placeholder='Write a comment' />
              <input type='submit' value='Post' />
            </form>
          </section>
        </section>
      )}
    </div>
  )
}

export default AddComent
