'use client'
import styles from './newpost.module.css'
import Image from 'next/image'
import { useEffect, useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import createPost from './createPost'
import errorTextReplace from '@/utility/errorTextReplace'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Button from '@/components/Button/Button'

const NewPostPage = ({ user }) => {
  const [event, updateEvent] = useReducer(
    (event, action) => {
      const newEvent = { ...event }

      switch (action.type) {
        case 'SET_CHARACTERS': {
          newEvent.characters = action.characters
          break
        }
        case 'SET_IMAGES': {
          newEvent.images = action.images
          break
        }
        case 'SET_LOADING': {
          newEvent.loading = action.loading
          break
        }
        case 'SET_MSG': {
          newEvent.msg = action.msg
          break
        }
        case 'SET_DONE': {
          newEvent.done = action.done
        }
      }

      return newEvent
    },
    {
      characters: 0,
      images: [],
      done: false,
      msg: null,
      loading: false
    }
  )
  const formRef = useRef(null)
  const fileRef = useRef(null)
  const router = useRouter()

  const handleSubmit = useSubmitRef(formRef)

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    updateEvent({ type: 'SET_CHARACTERS', characters: targetValue.length })
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    updateEvent({ type: 'SET_IMAGES', images: files })
  }

  const handleRemoveImg = (index) => {
    // * Remove the image visually
    const newImages = [...event.images]
    newImages.splice(index, 1)
    updateEvent({ type: 'SET_IMAGES', images: newImages })
  }

  const handlePost = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', e.target.content.value) // * Append the content to the formData

    for (let i = 0; i < event.images.length; i++) {
      formData.append('files', event.images[i])
    }

    const formDataChecker = Object.fromEntries(new FormData(e.target))
    const content = formDataChecker.content

    if (content !== '') {
      if (content.length >= 8) {
        updateEvent({ type: 'SET_LOADING', loading: true })
      }

      const data = await createPost(formData)

      if (data.data !== undefined) {
        router.push(`/posts/${data.data}`)
      }

      if (data.status === undefined) {
        // * If token expires, log out the user
        updateEvent({
          type: 'SET_MSG',
          msg: 'Your session has expired. Logging out...'
        })
        updateEvent({ type: 'SET_DONE', done: false })

        setTimeout(() => {
          window.localStorage.removeItem('token')
          window.location.reload()
        }, 1000)
        return
      }

      console.log(data)
      if (data.status === 400) {
        const replacedErrorText = errorTextReplace(data)
        updateEvent({ type: 'SET_MSG', msg: replacedErrorText })
      } if (data.status === 200) {
        updateEvent({ type: 'SET_MSG', msg: 'Post published successfully' })
        updateEvent({ type: 'SET_DONE', done: true })
      } else {
        updateEvent({ type: 'SET_MSG', msg: 'Something went wrong' })
      }
    } else {
      updateEvent({ type: 'SET_MSG', msg: 'Your post cannot be empty' })
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateEvent({ type: 'SET_DONE', done: false })
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [event.done])

  return (
    <>
      <main className={event.done ? styles.newpostdenied : styles.newpost}>
        <section className={styles.newpostcontainer}>
          <div className={styles.newpostitems}>
            {user.profile_Picture
              ? (
                <Image
                  style={{ filter: event.done ? 'grayscale(100)' : '' }}
                  src={user.profile_Picture}
                  alt={user.username}
                  width={75}
                  height={75}
                />
                )
              : (
                <div className={styles.nouser}>?</div>
                )}
            <section className={styles.inputandcharcount}>
              <form ref={formRef} onSubmit={handlePost}>
                <input
                  style={{ cursor: event.done ? 'not-allowed' : '' }}
                  type='text'
                  name='content'
                  placeholder='Post something new'
                  required
                  autoComplete='off'
                  onChange={handleCharacterCount}
                  maxLength='255'
                />
                <input
                  type='file'
                  name='files'
                  ref={fileRef}
                  onChange={handleImageSelect}
                  multiple
                />
              </form>
              <div>
                <p
                  style={{
                    color:
                      event.msg === 'Your post cannot be empty' ||
                      event.msg === 'Please provide at least 8 characters'
                        ? 'red'
                        : 'black'
                  }}
                >
                  {event.msg}
                </p>
                <p
                  style={{ color: event.characters === 255 ? 'red' : 'black' }}
                >
                  {event.characters}/255
                </p>
              </div>
            </section>
            <span
              onClick={() => fileRef.current.click()}
              className='material-symbols-outlined'
            >
              add_photo_alternate
            </span>
            <div onClick={handleSubmit}>
              <Button
                text='Post'
                backgroundColor={event.done ? '#7a7a7a' : '#ed2085'}
                textColor='white'
                loading={event.loading}
              />
            </div>
          </div>
          {event.images.length > 0
            ? (
              <section className={styles.uploadedimages}>
                <ul>
                  {event.images.map((image, index) => (
                    <li key={index}>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        width={100}
                        height={100}
                      />
                      <span
                        onClick={() => handleRemoveImg(index)}
                        className='material-symbols-outlined'
                      >
                        close
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              )
            : (
              <p style={{ margin: 0 }}>
                Select multiple images with CTRL + Click
              </p>
              )}
        </section>
      </main>
    </>
  )
}

export default NewPostPage
