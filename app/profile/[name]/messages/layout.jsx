'use client'
import { useEffect, useState } from 'react'
import getMessageSenders from './getMessageSenders'
import Image from 'next/image'
import Link from 'next/link'
import styles from './messages.module.css'
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/navigation'

const MessagesPage = (props) => {
  const { name } = props.params
  const { user } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState({ data: null, status: null })

  useEffect(() => {
    // * Compare the user profile we are at with the logged in user
    // * If they match, return the recent messaged for the logged in user
    if (user?.username === name) {
      const fetchUsers = async () => {
        const fetched = await getMessageSenders()
        setUsers({ ...users, data: fetched?.data, status: fetched?.status })
      }
      fetchUsers()
    } else {
      router.push('/')
    }
  }, [])

  return (
    <section className={styles.messages}>
      {users?.data?.length > 0 && user?.username === name && (
        <ul>
          {users?.data?.map((user) => (
            <li key={user.user_Id}>
              <div className={styles.user}>
                <Link href={`/profile/${name}/messages/${user.username}`}>
                  <Image
                    src={user.profile_Picture}
                    alt={user.username}
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {props.children}
    </section>
  )
}

export default MessagesPage
