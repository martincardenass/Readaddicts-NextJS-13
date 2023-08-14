'use client'
import { useEffect, useRef, useState } from 'react'
import { useFetcher } from '@/hooks/useFetcher'
import styles from '../post.module.css'
import Button from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'

const EditPost = ({ params }) => {
  const { patchPost, msg, post, changed } = useFetcher()
  const [characters, setCharacters] = useState(0)
  const formRef = useRef()
  const { id } = params

  const handleSubmit = useSubmitRef(formRef)

  const handleUpdate = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const dataHasChanges = Object.fromEntries(new FormData(e.target))

    const fieldsHaveChanged = Object.values(dataHasChanges).some(
      (field) => field !== post.content
    )

    if (fieldsHaveChanged) {
      patchPost(id, data)
    }
  }

  useEffect(() => {
    if (post?.content) {
      setCharacters(post?.content?.length)
    }
  }, [post.author])

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    setCharacters(targetValue.length)
  }

  return (
    <section className={styles.optionsdelete}>
      <section className={styles.inputandcharcount}>
        <form
          ref={formRef}
          onSubmit={handleUpdate}
          className={styles.updatepostform}
        >
          <textarea
            type='text'
            name='content'
            defaultValue={post?.content}
            maxLength='255'
            onChange={handleCharacterCount}
            placeholder='You can type here'
          />
        </form>
        <div>
          <p style={{
            color:
            msg === 'Your post cannot be empty' ||
            msg === 'Please provide at least 8 characters'
              ? 'red'
              : 'black'
          }}
          >{msg}
          </p>
          <p style={{ color: characters === 255 ? 'red' : 'black' }}>
            {characters}/255
          </p>
        </div>
      </section>
      <div className={styles.deletebuttons}>
        <div onClick={handleSubmit}>
          <Button text='Confirm' backgroundColor='rgb(185, 247, 255)' />
        </div>
        <Button href={`/posts/${id}`} text='Cancel' />
      </div>
      {changed && (
        msg === 'Please provide at least 8 characters' ? <Alert message={msg} width='300px' /> : <Alert message={msg} width='200px' />
      )}
    </section>
  )
}

export default EditPost
