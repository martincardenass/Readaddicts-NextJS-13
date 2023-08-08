'use client'
import { useRef } from 'react'
import { useFetcher } from '@/hooks/useFetcher'
import styles from '../post.module.css'
import Button from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'

const EditPost = ({ params }) => {
  const { patchPost, msg, post } = useFetcher()
  const formRef = useRef()
  const { id } = params

  const handleSubmit = useSubmitRef(formRef)

  const handleUpdate = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const fieldsHaveChanged = Object.values(data).some(field => field !== post.content)

    if (fieldsHaveChanged) {
      patchPost(id, data.content)
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
