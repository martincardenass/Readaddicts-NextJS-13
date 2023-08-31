'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import patchProfile from './patchProfile'
import getUserPrivate from '../getUserPrivate'
import Unauthorized from './Unauthorized'
import NotFound from './NotFound'
import UpdateForm from './UpdateForm'
import Alert from '@/components/Alert/Alert'

const UpdateProfile = ({ params }) => {
  const { name } = params
  const { user } = useAuth()
  const [privateUser, setPrivateUser] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserPrivate(user?.user_Id)
      setPrivateUser(data)
    }

    // * Initial value its undefined.
    if (user?.user_Id !== null && user?.user_Id !== undefined) {
      fetchUser()
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formDataHasContentChecker = Object.fromEntries(new FormData(e.target))

    const fieldsHaveChanged = Object.values(formDataHasContentChecker).some(
      (field) => {
        if (typeof field === 'object') {
          // * if imageFile name its empty no image has been provided
          return field.name !== ''
        } else {
          return field !== ''
        }
      }
    )

    if (fieldsHaveChanged) {
      setLoading(true)
      const userFromtoken = window.localStorage.getItem('user')
      const user = JSON.parse(userFromtoken)

      if (privateUser?.data?.username === name) {
        const newProfile = await patchProfile(formData)
        user.profile_Picture = newProfile.data.profile_Picture
        const updatedUser = JSON.stringify(user)
        window.localStorage.setItem('user', updatedUser)
        setUpdated(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }

  if (privateUser?.status === 404) {
    return <NotFound status={privateUser.status} />
  }

  if (privateUser?.data?.username === name) {
    return (
      <>
        <UpdateForm
          user={privateUser?.data}
          handleUpdate={handleUpdate}
          loading={loading}
        />
        {updated
          ? (
            <Alert message='Your changes have been saved.' width='240px' />
            )
          : (
            <Alert message='Beware! No field changes detected' width='270px' />
            )}
      </>
    )
  } else {
    return <Unauthorized />
  }
}

export default UpdateProfile
