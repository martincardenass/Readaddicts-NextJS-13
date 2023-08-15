'use client'
import styles from './newpost.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import createPost from './createPost'
import errorTextReplace from '@/utility/errorTextReplace'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const NewPostPage = ({ user }) => {
  const [characters, setCharacters] = useState(0)
  const [images, setImages] = useState([])
  const [posted, setPosted] = useState(false)
  const [msg, setMsg] = useState(null)
  const formRef = useRef(null)
  const fileRef = useRef(null)
  const router = useRouter()

  const formSubmitFromRef = (e) => {
    e.preventDefault()
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    setCharacters(targetValue.length)
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
  }

  const handleRemoveImg = (index) => {
    // * Remove the image visually
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handlePost = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', e.target.content.value) // * Append the content to the formData
    for (let i = 0; i < images.length; i++) {
      formData.append('files', images[i])
    }
    const formDataChecker = Object.fromEntries(new FormData(e.target))

    if (formDataChecker.content !== '') {
      const data = await createPost(formData)
      if (data.data !== undefined) {
        router.push(`/posts/${data.data}`)
      }

      if (data.status === undefined) { // * If token expires, log out the user
        setMsg('Your session has expired. Logging out...')
        setPosted(false)

        setTimeout(() => {
          window.localStorage.removeItem('token')
          window.location.reload()
        }, 1000)
        return
      }

      if (data.status === 400) {
        const replacedErrorText = errorTextReplace(data)
        setMsg(replacedErrorText)
        // * There are only two status responses 400 or 200. Explicit error handling its not necessary just use else
      } else {
        setMsg('Post published successfully') // * Delete any error messages (if any)
        setPosted(true)
      }
      // * else formData its empty so the input does not have any info
    } else {
      setMsg('Your post cannot be empty')
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPosted(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [posted])

  return (
    <>
      <main className={posted ? styles.newpostdenied : styles.newpost}>
        <section className={styles.newpostcontainer}>
          <div className={styles.newpostitems}>
            <Image
              style={{ filter: posted ? 'grayscale(100)' : '' }}
              src={user.profile_Picture}
              alt={user.username}
              width={75}
              height={75}
            />
            <section className={styles.inputandcharcount}>
              <form ref={formRef} onSubmit={handlePost}>
                <input
                  style={{ cursor: posted ? 'not-allowed' : '' }}
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
                      msg === 'Your post cannot be empty' ||
                      msg === 'Please provide at least 8 characters'
                        ? 'red'
                        : 'black'
                  }}
                >
                  {msg}
                </p>
                <p style={{ color: characters === 255 ? 'red' : 'black' }}>
                  {characters}/255
                </p>
              </div>
            </section>
            <span
              onClick={() => fileRef.current.click()}
              className='material-symbols-outlined'
            >
              add_photo_alternate
            </span>
            <div onClick={formSubmitFromRef}>
              <DynamicButton
                text='Post'
                backgroundColor={posted ? '#7a7a7a' : '#ed2085'}
                textColor='white'
              />
            </div>
          </div>
          {images.length > 0
            ? (
              <section className={styles.uploadedimages}>
                <ul>
                  {images.map((image, index) => (
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
