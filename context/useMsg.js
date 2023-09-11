'use client'
import { createContext, useContext, useState } from 'react'

const MsgContext = createContext(null)

export const MsgProvider = ({ children }) => {
  const [newMessage, setNewMessage] = useState({ data: [], status: null, sent: false })
  return (
    <MsgContext.Provider value={{ setNewMessage, newMessage }}>{children}</MsgContext.Provider>
  )
}

export const useMsg = () => useContext(MsgContext)
