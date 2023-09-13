'use client'
import styles from './users.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/useAuth'
import Button from '../Button/Button'
import { useEffect, useReducer, useRef } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import getUser from '@/app/profile/[name]/getUser'
import Alert from '../Alert/Alert'

const ACTIONS = {
  UPDATE_USERNAME: 'UPDATE_USERNAME',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  SET_USER_DATA: 'SET_USER_DATA',
  ALERT_MESSAGE_STATUS: 'ALERT_MESSAGE_STATUS'
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTIONS.UPDATE_USERNAME: {
      const { username } = payload
      return {
        ...state,
        username
      }
    }
    case ACTIONS.UPDATE_PASSWORD: {
      return {
        ...state,
        password: payload
      }
    }
    case ACTIONS.SET_USER_DATA: {
      const { data, username } = payload

      if (data.status === 200) {
        return {
          ...state,
          userData: data,
          message: {
            text: `Welcome ${
              username.charAt(0).toUpperCase() + state.username.slice(1)
            }. Please enter your password.`,
            status: true,
            backgroundColor: 'rgb(0, 210, 255)',
            width: '370px',
            color: 'white'
          }
        }
      }
      if (data.status === 404) {
        return {
          ...state,
          userData: data.text,
          message: {
            text: `The user ${
              username.charAt(0).toUpperCase() + state.username.slice(1)
            } does not exist`,
            status: true,
            backgroundColor: 'red',
            width: '300px',
            color: 'white'
          }
        }
      } else {
        return {
          ...state
        }
      }
    }

    case ACTIONS.ALERT_MESSAGE_STATUS: {
      return {
        ...state,
        message: {
          ...state.message,
          status: false
        }
      }
    }
  }
}

const initialState = {
  username: '',
  password: '',
  userData: null,
  message: {
    text: null,
    status: null,
    backgroundColor: null,
    color: null,
    width: null
  }
}

const Login = () => {
  const { handleLogin, msg } = useAuth()
  const [state, dispatch] = useReducer(reducer, initialState)
  const formRef = useRef()

  const handleSubmit = useSubmitRef(formRef)

  const fetchUser = async () => {
    const data = await getUser(state.username)
    dispatch({
      type: ACTIONS.SET_USER_DATA,
      payload: { data, username: state.username }
    })

    setTimeout(() => {
      dispatch({ type: ACTIONS.ALERT_MESSAGE_STATUS })
    }, 2000)
  }

  const populateUsername = (e) => {
    e.preventDefault()
    const usernameFormData = Object.fromEntries(new FormData(e.target))
    dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: usernameFormData })
  }

  const handleSubmitCredentials = (e) => {
    e.preventDefault() // * curried function
    handleLogin(e, state.username, state.password)

    setTimeout(() => {
      dispatch({ type: ACTIONS.ALERT_MESSAGE_STATUS })
    }, 5000)
  }

  useEffect(() => {
    if (state.username && state.username !== '') {
      fetchUser()
    }
  }, [state.username])

  if (state.userData?.status === 200) {
    const user = state.userData.text
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
                  dispatch({
                    type: ACTIONS.UPDATE_PASSWORD,
                    payload: e.target.value
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
        </section>
        <Alert
          message={msg.text}
          ready={msg.status}
          backgroundColor={msg.backgroundColor}
          color={msg.color}
          width={msg.width}
        />
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
            maxLength='16'
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
      <Alert
        message={state.message.text}
        ready={state.message.status}
        backgroundColor={state.message.backgroundColor}
        color={state.message.color}
        width={state.message.width}
      />
    </main>
  )
}

export default Login
