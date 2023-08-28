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

const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const UpdateProfile = ({ params }) => {
  const { name } = params
  const { user } = useAuth()
  const [thisUser, setThisUser] = useState(null)
  const [paramsUser, setParamsUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [image, setImage] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(false)

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
    const formDataHasContentChecker = Object.fromEntries(new FormData(e.target))

    const fieldsHaveChanged = Object.values(formDataHasContentChecker).some(field => {
      if (typeof field === 'object') {
        // * imageFile its an object, if image has no name it means no image has been provided
        return field.name !== ''
      } else {
        // * while the other areas are strings. If fields are empty, then nothing was provided
        return field !== ''
      }
    })

    if (fieldsHaveChanged) {
      const userFromtoken = window.localStorage.getItem('user')
      const user = JSON.parse(userFromtoken)
      setLoading(true)
      const newProfile = await patchProfile(formData)
      user.profile_Picture = newProfile.data.profile_Picture
      const updatedUser = JSON.stringify(user)
      window.localStorage.setItem('user', updatedUser)
      setUpdated(true)
      setLoading(false)
    }
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
      <>
        <DynamicUpdateForm
          thisUser={thisUser}
          handleUpdate={handleUpdate}
          handleImageSelect={handleImageSelect}
          image={image}
          loading={loading}
        />
        {updated && <DynamicAlert message='Your changes have been saved.' width='240px' />}
        {!updated && <DynamicAlert message='Beware! No field changes detected' width='270px' />}
      </>
    )
  }

  return <DynamicUnauthorized />
}

export default UpdateProfile
