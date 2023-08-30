'use client'
import styles from '@/components/Login/users.module.css'
import Button from '@/components/Button/Button'
import createUser from './createUser'
import { useEffect, useReducer, useRef } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import validateUsername from './usernameValidator'
import validateEmail from './emailValidator'
import { acceptedDomains } from './domains'

const registerReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_RESPONSE': {
      if (payload.status === 400) {
        return {
          ...state,
          error: payload.text[0]
        }
      }

      if (payload.status === 200) {
        window.localStorage.setItem('token', payload.data.token)
        window.localStorage.setItem('user', JSON.stringify(payload.data.user))
        window.location.reload()
        return { ...state }
      }
      return { ...state }
    }

    case 'IS_USERNAME_TAKEN': {
      if (payload.ok) {
        return {
          ...state,
          isUsernameTaken: true,
          userBorder: 'red'
        }
      } else {
        return {
          ...state,
          isUsernameTaken: false,
          userBorder: '#73ff83'
        }
      }
    }

    case 'IS_EMAIL_TAKEN': {
      if (payload.ok) {
        return {
          ...state,
          isEmailTaken: true,
          emailBorder: 'red'
        }
      } else {
        return {
          ...state,
          isEmailTaken: false,
          emailBorder: '#73ff83'
        }
      }
    }

    case 'PASSWORD_VALIDATOR': {
      if (payload.length < 6) {
        return {
          ...state,
          isPasswordValid: false,
          passwordBorder: 'red'
        }
      } else {
        return {
          ...state,
          isPasswordValid: true,
          passwordBorder: '#73ff83'
        }
      }
    }

    case 'USERNAME_ERROR': {
      return {
        ...state,
        isUsernameTaken: true, // * Username its not taken in this case but just doing it for the error handling
        userBorder: 'red'
      }
    }

    case 'EMAIL_ERROR': {
      return {
        ...state,
        isEmailTaken: true, // * Same as above
        emailBorder: 'red'
      }
    }
  }
}

const SignUpPage = () => {
  const formRef = useRef(null)
  const { user } = useAuth()
  const router = useRouter()

  const [state, dispatch] = useReducer(registerReducer, {
    error: '',
    username: '',
    isUsernameTaken: null,
    isEmailTaken: null,
    isPasswordValid: null,
    userBorder: 'rgba(255, 255, 255, 0.0)',
    emailBorder: 'rgba(255, 255, 255, 0.0)',
    passwordBorder: 'rgba(255, 255, 255, 0.0)'
  })

  const handleSubmit = useSubmitRef(formRef)

  const validateUsernameField = async (e) => {
    let username = e.target.value
    if (username.length > 16) {
      username = username.substring(0, 15)
    }
    if (username.length < 4) {
      dispatch({ type: 'USERNAME_ERROR' })
    }
    if (username.length >= 4 && username.length <= 16) {
      const validate = await validateUsername(username)
      dispatch({ type: 'IS_USERNAME_TAKEN', payload: validate })
    }
  }

  const validateEmailField = async (e) => {
    const email = e.target.value
    if (email.includes('@')) {
      const parts = email.split('@')
      // * Split the email in two pieces using @ as a delimiter and check if the first piece (before the @) has content
      if (parts.length === 2 && parts[0].length > 0) {
        for (let i = 0; i < acceptedDomains.length; i++) {
          // * Iterate over the acceptedDomains array to find if the email includes a valid domain
          if (email.includes(acceptedDomains[i])) {
            const validate = await validateEmail(email)
            dispatch({ type: 'IS_EMAIL_TAKEN', payload: validate })
            break
          } else {
            // * Email misssing accepted domains
            dispatch({ type: 'EMAIL_ERROR' })
          }
        }
      } else {
        // * Email missing content before @
        dispatch({ type: 'EMAIL_ERROR' })
      }
    } else {
      // * Email missing '@'
      dispatch({ type: 'EMAIL_ERROR' })
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('role', 'user') // * Add user role

    const formDataChecker = Object.fromEntries(new FormData(e.target))

    if (
      Object.values(formDataChecker).every((value) => value !== '') &&
      !state.isUsernameTaken &&
      !state.isEmailTaken &&
      state.isPasswordValid
    ) {
      const data = await createUser(formData)
      dispatch({ type: 'SET_RESPONSE', payload: data })
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return (
      <main className={styles.usersmain}>
        <h1>Create a new account</h1>
        <form ref={formRef} className={styles.form} onSubmit={handleCreate}>
          <section className={styles.formfield}>
            <p>
              <span style={{ color: 'red' }}>*&nbsp;</span>Username:
            </p>
            <input
              style={{ border: `2px solid ${state.userBorder}` }}
              onBlur={validateUsernameField}
              type='text'
              placeholder='Username'
              name='username'
              required
            />
            <h1
              style={{
                visibility:
                  state.isUsernameTaken === null ? 'hidden' : 'visible',
                color: state.isUsernameTaken ? 'red' : '#73ff83',
                userSelect: 'none',
                margin: '0',
                width: '10px'
              }}
            >
              {state.isUsernameTaken ? '!' : '✓'}
            </h1>
          </section>
          <section className={styles.formfield}>
            <p>
              <span style={{ color: 'red' }}>*&nbsp;</span>Email:
            </p>
            <input
              style={{ border: `2px solid ${state.emailBorder}` }}
              onBlur={validateEmailField}
              type='text'
              placeholder='Email Address'
              name='email'
              required
            />
            <h1
              style={{
                visibility: state.isEmailTaken === null ? 'hidden' : 'visible',
                color: state.isEmailTaken ? 'red' : '#73ff83',
                userSelect: 'none',
                margin: '0',
                width: '10px'
              }}
            >
              {state.isEmailTaken ? '!' : '✓'}
            </h1>
          </section>
          <section className={styles.formfield}>
            <p>
              <span style={{ color: 'red' }}>*&nbsp;</span>Password:
            </p>
            <input
              style={{ border: `2px solid ${state.passwordBorder}` }}
              type='password'
              placeholder='Password'
              name='password'
              required
              autoComplete='off'
              onBlur={(e) =>
                dispatch({
                  type: 'PASSWORD_VALIDATOR',
                  payload: e.target.value
                })}
            />
            <h1
              style={{
                visibility:
                  state.isPasswordValid === null ? 'hidden' : 'visible',
                color: state.isPasswordValid ? '#73ff83' : 'red',
                userSelect: 'none',
                margin: '0',
                width: '10px'
              }}
            >
              {state.isPasswordValid ? '✓' : '!'}
            </h1>
          </section>
        </form>
        <p
          style={{
            marginTop: 0,
            visibility: state.isPasswordValid ? 'hidden' : 'visible',
            fontSize: '12px'
          }}
        >
          Password must be at least 6 characters long
        </p>
        <div onClick={handleSubmit}>
          <Button
            text='Sign up'
            backgroundColor='#ed2085'
            textColor='white'
            effectColor='rgb(235, 235, 235)'
          />
        </div>
      </main>
    )
  }
}

export default SignUpPage
