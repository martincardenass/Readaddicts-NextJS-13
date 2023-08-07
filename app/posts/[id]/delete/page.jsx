'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../post.module.css'
import deletePost from './deletePost'
import Button from '@/components/Button/Button'
import Alert from '@/components/Alert/Alert'

const RemovePost = ({ params }) => {
  const [msg, setMsg] = useState('')
  const { id } = params
  const router = useRouter()

  const handleDelete = async () => {
    const result = await deletePost(id)
    setMsg(result.text)
    router.push('/')
  }

  return (
    <section className={styles.optionsdelete}>
      <h3>
        This post will be{' '}
        <span style={{ color: 'rgb(255, 63, 63)' }}>deleted</span>.
      </h3>
      <p>
        Please note all the <span style={{ textDecoration: 'underline' }}>comments</span> of this post will also be{' '}
        <span style={{ color: 'rgb(255, 63, 63)' }}>deleted</span>!
      </p>
      <div className={styles.deletebuttons}>
        <div onClick={handleDelete}>
          <Button
            text='Confirm'
            backgroundColor='rgb(255, 63, 63)'
            textColor='white'
          />
        </div>
        <Button
          href={`/posts/${id}`}
          text='Cancel'
        />
      </div>
      {msg && <Alert message={msg} width='100px' />}
    </section>
  )
}

export default RemovePost
