'use client'
import authenticate from '@/components/Login/authenticate'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState() // ! Giving erro on deploy
  const [msg, setMsg] = useState({
    text: null,
    status: null,
    backgroundColor: null,
    color: null,
    width: null
  })

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user !== null) {
      setUser(JSON.parse(user))
    }
  }, [window.localStorage])

  const handleLogin = async (e, username, password) => {
    e.preventDefault()
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user') // * Remove token and user from localStorage if they exist

    if (username === '' || password === '') {
      setMsg('Please provide all fields')
    }

    const auth = await authenticate(username, password)

    if (auth.status === 200) {
      // * Login and save token and some user info to localStorage
      window.localStorage.setItem('token', auth.data.token)
      window.localStorage.setItem('user', JSON.stringify(auth.data.user))
      setUser(auth.data.user)
      setMsg({
        text: 'Authentication successful',
        status: true,
        backgroundColor: 'rgb(0, 210, 255)',
        color: 'white',
        width: '200px'
      })

      setTimeout(() => {
        setMsg((prevMsg) => ({
          ...prevMsg,
          status: false
        }))
      }, 5000)
    }

    // * If credentials are wrong, display a message
    if (auth.status === 400) {
      setMsg({
        text: auth.data,
        status: true,
        backgroundColor: 'red',
        color: 'white',
        width: '150px'
      })

      setTimeout(() => {
        setMsg((prevMsg) => ({
          ...prevMsg,
          status: false
        }))
      }, 5000)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        msg,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
