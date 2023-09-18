'use client'
import styles from './newpost.module.css'
import Image from 'next/image'
import { useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import createPost from './createPost'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Button from '@/components/Button/Button'
import Alert from '@/components/Alert/Alert'

import ImageMemo from './Image'

const ACTIONS = {
  HANDLE_POST_DATA: 'HANDLE_POST_DATA',
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_IMAGES: 'SET_IMAGES',
  REMOVE_IMAGES: 'REMOVE_IMAGES',
  SET_LOADING: 'SET_LOADING',
  SET_MSG: 'SET_MSG',
  SET_DONE: 'SET_DONE'
}

const postReducer = (newPost, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.HANDLE_POST_DATA: {
      if (payload.status === undefined) {
        setTimeout(() => {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('user')
          window.location.reload()
        }, 1000)
        return {
          ...newPost,
          msg: {
            text: 'Your session has expired. You may login again.',
            status: true,
            backgroundColor: 'red',
            width: '350px',
            color: 'white'
          },
          done: false
        }
      } else {
        return {
          ...newPost
        }
      }
    }

    case ACTIONS.SET_CHARACTERS: {
      return {
        ...newPost,
        characters: payload
      }
    }

    case ACTIONS.SET_IMAGES: {
      return {
        ...newPost,
        images: payload
      }
    }

    case ACTIONS.REMOVE_IMAGES: {
      const newImages = [...newPost.images]
      newImages.splice(payload, 1)
      return {
        ...newPost,
        images: newImages
      }
    }

    case ACTIONS.SET_LOADING: {
      return {
        ...newPost,
        loading: true
      }
    }

    case ACTIONS.SET_MSG: {
      return {
        ...newPost,
        msg: {
          text: payload.text,
          status: payload.status,
          backgroundColor: payload.backgroundColor,
          color: payload.color,
          width: payload.width
        }
      }
    }

    case ACTIONS.SET_DONE: {
      return {
        ...newPost,
        done: payload
      }
    }
  }
}

const initialState = {
  characters: 0,
  images: [],
  done: false,
  msg: {
    text: null,
    status: null,
    backgroundColor: null,
    color: null,
    width: null
  },
  loading: false
}

const AddNewPost = ({ user, placeholder, groupId }) => {
  const [newPost, dispatch] = useReducer(postReducer, initialState)

  const formRef = useRef(null)
  const fileRef = useRef(null)
  const router = useRouter()

  const handleSubmit = useSubmitRef(formRef)

  const handlePost = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', e.target.content.value)

    // * Append groupId, if provided
    if (groupId) formData.append('groupId', groupId)

    for (let i = 0; i < newPost.images.length; i++) {
      formData.append('files', newPost.images[i])
    }

    const formDataChecker = Object.fromEntries(new FormData(e.target))
    const content = formDataChecker.content

    if (content !== '') {
      if (content.length >= 8) {
        dispatch({ type: ACTIONS.SET_LOADING })

        if (newPost.done) return
        const data = await createPost(formData)
        dispatch({ type: ACTIONS.HANDLE_POST_DATA, payload: data })

        if (data.status === 200) {
          router.push(`/posts/${data.data}`)
          dispatch({
            type: ACTIONS.SET_MSG,
            payload: {
              text: 'Post created successfully',
              status: true,
              color: 'white',
              backgroundColor: 'rgb(0, 210, 255)',
              width: '200px'
            }
          })
        }
      } else {
        dispatch({
          type: ACTIONS.SET_MSG,
          payload: {
            text: 'Please provide at least 8 characters',
            status: true,
            color: 'white',
            backgroundColor: 'red',
            width: '275px'
          }
        })

        setTimeout(() => {
          dispatch({
            type: ACTIONS.SET_MSG,
            payload: {
              text: 'Please provide at least 8 characters',
              status: false,
              color: 'white',
              backgroundColor: 'red',
              width: '275px'
            }
          })
        }, 5000)
      }
    } else {
      dispatch({
        type: ACTIONS.SET_MSG,
        payload: {
          text: 'Your post cannot be empty.',
          status: true,
          color: 'white',
          backgroundColor: 'red',
          width: '225px'
        }
      })

      setTimeout(() => {
        dispatch({
          type: ACTIONS.SET_MSG,
          payload: {
            text: 'Your post cannot be empty.',
            status: false,
            color: 'white',
            backgroundColor: 'red',
            width: '225px'
          }
        })
      }, 5000)
    }
  }

  return (
    <main className={newPost.done ? styles.newpostdenied : styles.newpost}>
      <section className={styles.newpostcontainer}>
        <div className={styles.newpostitems}>
          {user.profile_Picture
            ? (
              <Image
                style={{ filter: newPost.done ? 'grayscale(100)' : '' }}
                src={user.profile_Picture}
                alt={user.username}
                width={75}
                height={75}
              />
              )
            : (
              <div className={styles.nouser}>?</div>
              )}
          <div className={styles.inputandphoto}>
            <section className={styles.inputandcharcount}>
              <form ref={formRef} onSubmit={handlePost}>
                <input
                  style={{ cursor: newPost.done ? 'not-allowed' : '' }}
                  type='text'
                  name='content'
                  placeholder={placeholder}
                  required
                  autoComplete='off'
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_CHARACTERS,
                      payload: e.target.value.length
                    })}
                  maxLength='255'
                />
                <input
                  type='file'
                  name='files'
                  ref={fileRef}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_IMAGES,
                      payload: Array.from(e.target.files)
                    })}
                  multiple
                />
              </form>
              <div>
                <p
                  style={{
                    color: newPost.characters === 255 ? 'red' : 'black'
                  }}
                >
                  {newPost.characters}/255
                </p>
              </div>
            </section>
            <span
              onClick={() => fileRef.current.click()}
              className='material-symbols-outlined'
            >
              add_photo_alternate
            </span>
          </div>
          <div onClick={handleSubmit}>
            <Button
              text='Post'
              backgroundColor={newPost.done ? '#7a7a7a' : 'rgb(0, 210, 255)'}
              textColor='white'
              loading={newPost.loading}
            />
          </div>
        </div>
        {newPost.images.length > 0
          ? (
            <section className={styles.uploadedimages}>
              <ul>
                {newPost.images.map((image, index) => (
                  <li key={index}>
                    <ImageMemo imageBlob={image} index={index} />
                    <span
                      onClick={(index) =>
                        dispatch({ type: ACTIONS.REMOVE_IMAGES, payload: index })}
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
            <p style={{ marginBottom: 0 }}>
              Select multiple images with CTRL + Click
            </p>
            )}
      </section>
      <Alert
        message={newPost.msg.text}
        ready={newPost.msg.status}
        backgroundColor={newPost.msg.backgroundColor}
        color={newPost.msg.color}
        width={newPost.msg.width}
      />
    </main>
  )
}

export default AddNewPost
