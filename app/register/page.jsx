'use client'
import styles from '@/components/Login/users.module.css'
import Button from '@/components/Button/Button'
import createUser from './createUser'
import { useReducer, useRef } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const formRef = useRef(null)
  const router = useRouter()
  const [event, updateEvent] = useReducer(
    (event, action) => {
      const newEvent = { ...event }

      switch (action.type) {
        case 'SET_RESPONSE': {
          newEvent.response = action.response
          if (action.response.status === 400) {
            newEvent.error = action.response.text[0]
          }

          if (action.response.status === 200) {
            newEvent.token = action.response.data
            window.localStorage.setItem('token', newEvent.token)
            router.push('/')
            setTimeout(() => {
              window.location.reload()
            }, 100)
          }
          break
        }
      }
      return newEvent
    },
    {
      response: null,
      error: null,
      token: null
    }
  )

  const handleSubmit = useSubmitRef(formRef)

  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('role', 'user') // * Add user role

    const formDataChecker = Object.fromEntries(new FormData(e.target))

    if (Object.values(formDataChecker).every((value) => value !== '')) {
      const data = await createUser(formData)
      updateEvent({ type: 'SET_RESPONSE', response: data })
    }
  }

  return (
    <main className={styles.usersmain}>
      <h1>Create a new account</h1>
      <form ref={formRef} className={styles.form} onSubmit={handleCreate}>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Username:
          </p>
          <input type='text' placeholder='Username' name='username' required />
        </section>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Email:
          </p>
          <input
            type='text'
            placeholder='Email Address'
            name='email'
            required
          />
        </section>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Password:
          </p>
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            autoComplete='off'
          />
        </section>
      </form>
      <div onClick={handleSubmit}>
        <Button
          text='Sign up'
          backgroundColor='#ed2085'
          textColor='white'
          effectColor='rgb(235, 235, 235)'
        />
      </div>
      {event.error && <p>{event.error.error}</p>}
      {/* {event.message && (
        <p>{event.message}</p>
      )} */}
    </main>
  )
}

export default SignUpPage
