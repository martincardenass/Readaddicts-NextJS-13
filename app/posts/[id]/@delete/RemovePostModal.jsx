'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import deletePost from './deletePost'
import styles from '../post.module.css'
import Button from '@/components/Button/Button'

const DeletePost = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const res = await deletePost(id)

    if (res.status === undefined || res.status === 500) {
      setMessage('Something went wrong')
      setLoading(false)
    }

    if (res.status === 200) {
      router.push('/')
    }
  }

  return (
    <section className={styles.optionsdelete}>
      <h3>
        This post will be{' '}
        <span style={{ color: 'rgb(255, 63, 63)' }}>deleted</span>.
      </h3>
      <p>
        Please note all <span style={{ textDecoration: 'underline' }}>comments and images</span> of this post will also be{' '}
        <span style={{ color: 'rgb(255, 63, 63)' }}>deleted</span>!
      </p>
      <div className={styles.deletebuttons}>
        {message && <span style={{ color: 'red' }}>{message}</span>}
        <div onClick={handleDelete}>
          <Button
            text='Confirm'
            backgroundColor='rgb(255, 63, 63)'
            textColor='white'
            loading={loading}
          />
        </div>
        <Button
          href={`/posts/${id}`}
          text='Cancel'
        />
      </div>
    </section>
  )
}

export default DeletePost
