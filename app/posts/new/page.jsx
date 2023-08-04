'use client'
import styles from './newpost.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const NewPostPage = ({ user, handlePost, posted, msg }) => {
  const [characters, setCharacters] = useState(0)
  const formRef = useRef(null)

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

  return (
    <main className={posted ? styles.newpostdenied : styles.newpost}>
      <section className={styles.newpostcontainer}>
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
              placeholder={` Say something, ${user.username}`}
              required
              autoComplete='off'
              onChange={handleCharacterCount}
              maxLength='255'
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
        <div onClick={formSubmitFromRef}>
          <DynamicButton
            text='Post'
            backgroundColor={posted ? '#7a7a7a' : '#ed2085'}
            textColor='white'
          />
        </div>
      </section>
    </main>
  )
}

export default NewPostPage
