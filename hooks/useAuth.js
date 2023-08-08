'use client'
import authenticate from '@/components/Login/authenticate'
import { createContext, useContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import getUser from '@/app/profile/[name]/getUser'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => window.localStorage.getItem('token') || null
  )
  const [tokenDecoded, setTokenDecoded] = useState(
    () => jwt.decode(token) || null
  )
  const [user, setUser] = useState(null)
  const [userStatusCode, setUserStatusCode] = useState(null)
  const [msg, setMsg] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('token') // * Remove the token from localStorage if it exists
    const data = Object.fromEntries(new FormData(e.target))

    if (data.username === '' || data.password === '') {
      setMsg('Please provide all fields')
      return
    }

    const auth = await authenticate(data.username, data.password)

    // * If credentials are correct, login
    if (auth.status === 200) {
      setToken(auth.text)
      window.localStorage.setItem('token', auth.text)
    }

    // * If credentials are wrong, display a message
    if (auth.status === 400) {
      setMsg(auth.text)
    }
  }

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token)
      setTokenDecoded(decoded)
    }
  }, [token])

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(tokenDecoded?.unique_name)
      setUser(data.text)
      setUserStatusCode(data.status)
    }
    fetchUser()
  }, [tokenDecoded?.unique_name])

  return (
    <AuthContext.Provider
      value={{ handleLogin, token, msg, tokenDecoded, user, userStatusCode }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
