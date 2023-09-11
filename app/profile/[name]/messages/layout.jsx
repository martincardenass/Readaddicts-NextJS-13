'use client'
import { useEffect, useState } from 'react'
import getMessageSenders from './getMessageSenders'
import Image from 'next/image'
import Link from 'next/link'
import styles from './messages.module.css'

const MessagesPage = (props) => {
  const { name } = props.params
  const [users, setUsers] = useState({ data: null, status: null })

  const fetchMessages = async () => {
    const fetched = await getMessageSenders()
    setUsers({ ...users, data: fetched?.data, status: fetched?.status })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <section className={styles.messages}>
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
      {props.children}
    </section>

  )
}

export default MessagesPage
