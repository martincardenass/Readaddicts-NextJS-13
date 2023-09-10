'use client'
import styles from './users.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Button from '../Button/Button'
import { useEffect, useReducer, useRef } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import getUser from '@/app/profile/[name]/getUser'

const Login = () => {
  const { handleLogin, msg } = useAuth() // * Trabajar en el message.
  const [event, updateEvent] = useReducer(
    (event, action) => {
      const newEvent = { ...event }

      switch (action.type) {
        case 'UPDATE_USERNAME': {
          newEvent.username = action.username
          break
        }
        case 'UPDATE_PASSWORD': {
          newEvent.password = action.password
          break
        }
        case 'SET_USER_DATA': {
          newEvent.userData = action.userData
          if (action.userData.status === 404) {
            newEvent.message = action.userData.text
          }
          break
        }
      }

      return newEvent
    },
    {
      username: '',
      password: '',
      userData: null,
      message: null
    }
  )
  const formRef = useRef()

  const handleSubmit = useSubmitRef(formRef)

  const fetchUser = async () => {
    const data = await getUser(event.username)
    updateEvent({ type: 'SET_USER_DATA', userData: data })
  }

  const populateUsername = (e) => {
    e.preventDefault()
    const usernameFormData = Object.fromEntries(new FormData(e.target))
    updateEvent({
      type: 'UPDATE_USERNAME',
      username: usernameFormData.username
    })
  }

  const handleSubmitCredentials = (e) => {
    e.preventDefault() // * curried function
    handleLogin(e, event.username, event.password)
  }

  useEffect(() => {
    if (event.username && event.username !== '') {
      fetchUser()
    }
  }, [event.username])

  if (event.userData?.status === 200) {
    const user = event.userData.text
    return (
      <section className={styles.user}>
        <section className={styles.userbanner}>
          {user.profile_Picture && (
            <Image
              src={user.profile_Picture}
              alt={user.username}
              width={200}
              height={200}
            />
          )}
          <h1>
            Welcome back, <span>{user.username}</span>. Please type your
            password.
          </h1>
          <form onSubmit={handleSubmitCredentials}>
            <section className={styles.formfield}>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) =>
                  updateEvent({
                    type: 'UPDATE_PASSWORD',
                    password: e.target.value
                  })}
                required
                autoFocus
              />
            </section>
          </form>
          <div onClick={handleSubmitCredentials}>
            <Button
              text='Login'
              backgroundColor='rgb(0, 210, 255)'
              textColor='white'
              effectColor='rgb(235, 235, 235)'
            />
          </div>
          <span style={{ marginTop: '1rem' }}>{msg && msg}</span>
        </section>
      </section>
    )
  }

  return (
    <main className={styles.usersmain}>
      <h1>Welcome to Readaddicts.</h1>
      <h2>Connect with readers, share books, ignite conversations.</h2>
      <p>
        Dont have an account?{' '}
        <Link href='register'>
          <span className={styles.register}>Register</span>
        </Link>
      </p>
      <form ref={formRef} className={styles.form} onSubmit={populateUsername}>
        <section className={styles.formfield}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            required
            autoComplete='off'
            autoFocus
          />
        </section>
      </form>
      <div onClick={handleSubmit}>
        <Button
          text='Next'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          effectColor='rgb(235, 235, 235)'
        />
      </div>
      <span style={{ marginTop: '1rem' }}>
        {event.message && event.message}
      </span>
    </main>
  )
}

export default Login
