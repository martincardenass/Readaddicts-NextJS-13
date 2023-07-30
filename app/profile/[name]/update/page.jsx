'use client'
import { useEffect, useState } from 'react'
import updateProfile from './updateProfile'
import getUserPrivate from '../getUserPrivate'
import getUser from '../getUser'
import { useAuth } from '@/hooks/useAuth'
import styles from './updateprofile.module.css'
import Link from 'next/link'

const UpdateProfile = ({ params }) => {
  const { name } = params
  const { user } = useAuth()
  const [msg, setMsg] = useState(null)
  const [thisUser, setThisUser] = useState(null)
  const [paramsUser, setParamsUser] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserPrivate(user?.user_Id)
      setThisUser(data.data)
    }

    fetchUser()
  }, [user?.user_Id])

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
    const result = await updateProfile(formData)

    setMsg(result)
  }

  // * On page load we fetch the user based on the params, and we check the response status.
  if (status === 404) {
    return (
      <section className={styles.badhttpstatuscode}>
        <h1>{status} Not Found</h1>
        <h3>{paramsUser}</h3>
      </section>
    )
  }

  // * If the user tries to modify the URL to update someone elses profile return something else
  if (thisUser?.user_Id !== paramsUser?.user_Id) {
    return (
      <section className={styles.badhttpstatuscode}>
        <h1>401 Unauthorized</h1>
        <h3>You cannot edit someone else profile.</h3>
        <span className={styles.gohome}>
          <Link href='/'>Go Home</Link>
        </span>
      </section>
    )
  }

  // * The input names should match exactly with the names in the backend

  // * The date contains HOURS as well. Remove it because otherwise we cannot show the default value in the input type date.
  const formattedBirthday =
    thisUser?.birthday && thisUser.birthday.split('T')[0]

  if (thisUser?.user_Id === paramsUser?.user_Id) {
    return (
      <>
        <h1>Update profile</h1>
        <form onSubmit={handleUpdate}>
          <p>First Name:</p>
          <input
            type='text'
            name='first_Name'
            autoComplete='off'
            placeholder={thisUser?.first_Name}
          />
          <p>Last name:</p>
          <input
            type='text'
            name='last_Name'
            autoComplete='off'
            placeholder={thisUser?.last_Name}
          />
          <p>Email:</p>
          <input
            type='text'
            name='email'
            autoComplete='off'
            placeholder={thisUser?.email}
          />
          <p>Password:</p>
          <input type='password' name='password' autoComplete='off' />
          <p>Gender:</p>
          <input
            type='text'
            name='gender'
            autoComplete='off'
            placeholder={thisUser?.gender}
          />
          <p>Birthday:</p>
          <input
            type='date'
            name='birthday'
            autoComplete='off'
            defaultValue={formattedBirthday}
          />
          <p>Profile picture:</p>
          <input type='file' name='imageFile' autoComplete='off' />
          <p>Bio:</p>
          <input
            type='text'
            name='bio'
            autoComplete='off'
            placeholder={thisUser?.bio}
          />
          <input type='submit' />
        </form>
        {msg && <section>{msg.data}</section>}
      </>
    )
  }
}

export default UpdateProfile
