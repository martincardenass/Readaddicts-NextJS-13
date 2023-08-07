'use client'
import { useEffect, useRef, useState } from 'react'
import getPost from '../getPost'
import updatePost from './updatePost'
import styles from '../post.module.css'
import Button from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'

const EditPost = ({ params }) => {
  const [post, setPost] = useState(null)
  const [msg, setMsg] = useState(null)
  const formRef = useRef()
  const { id } = params

  const fetchPost = async () => {
    const data = await getPost(id)
    setPost(data.data)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleSubmit = useSubmitRef(formRef)

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const fieldsHaveChanged = Object.values(data).some(field => field !== post.content)

    if (fieldsHaveChanged) {
      const response = await updatePost(id, data.content)
      setMsg(response)
    }
  }

  return (
    <section className={styles.optionsdelete}>
      <form ref={formRef} onSubmit={handleUpdate} className={styles.updatepostform}>
        <textarea type='text' name='content' defaultValue={post?.content} />
      </form>
      <div className={styles.deletebuttons}>
        <div onClick={handleSubmit}>
          <Button text='Confirm' backgroundColor='rgb(185, 247, 255)' />
        </div>
        <Button href={`/posts/${id}`} text='Cancel' />
      </div>
      {msg && <Alert message={msg.data} width='120px' />}
    </section>
  )
}

export default EditPost
