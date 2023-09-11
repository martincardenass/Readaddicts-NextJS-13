'use client'
import authenticate from '@/components/Login/authenticate'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  let tokenUser
  if (typeof window !== 'undefined') {
    tokenUser = window && window.localStorage.getItem('user')
  }
  const [user, setUser] = useState(JSON.parse(tokenUser))
  const [msg, setMsg] = useState(null)

  const handleLogin = async (e, username, password) => {
    e.preventDefault()
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
      setMsg('')
    }

    // * If credentials are wrong, display a message
    if (auth.status === 400) {
      setMsg(auth.data)
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
