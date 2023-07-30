'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import patchProfile from './patchProfile'
import getUserPrivate from '../getUserPrivate'
import getUser from '../getUser'
import dynamic from 'next/dynamic'
import styles from './updateprofile.module.css'

const DynamicNotFound = dynamic(() => import('./NotFound'), {
  loading: () => (
    <section className={styles.loading}>
      <h1>Loading...</h1>
    </section>
  )
})

const DynamicUnauthorized = dynamic(() => import('./Unauthorized'), {
  loading: () => (
    <section className={styles.loading}>
      <h1>Loading...</h1>
    </section>
  )
})

const DynamicUpdateForm = dynamic(() => import('./UpdateForm'), {
  loading: () => (
    <section className={styles.loading}>
      <h1>Loading...</h1>
    </section>
  )
})

const UpdateProfile = ({ params }) => {
  const { name } = params
  const { user } = useAuth()
  const [msg, setMsg] = useState(null)
  const [thisUser, setThisUser] = useState(null)
  const [paramsUser, setParamsUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserPrivate(user?.user_Id)
      setThisUser(data.data)
    }

    // * Initial value its undefined.
    if (user?.user_Id !== null && user?.user_Id !== undefined) {
      fetchUser()
    }
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(name)
      setParamsUser(data.text)
      setStatus(data.status)
    }

    fetchUser()
  }, [name])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const result = await patchProfile(formData)

    setMsg(result)
  }

  const handleImageSelect = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  if (status === 404) {
    return <DynamicNotFound status={status} paramsUser={paramsUser} />
  }

  if (thisUser?.user_Id === paramsUser?.user_Id) {
    return (
      <DynamicUpdateForm
        thisUser={thisUser}
        handleUpdate={handleUpdate}
        handleImageSelect={handleImageSelect}
        image={image}
        msg={msg}
      />
    )
  }

  return <DynamicUnauthorized />
}

export default UpdateProfile
