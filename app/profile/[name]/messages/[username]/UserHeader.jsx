import styles from '../messages.module.css'
import getUser from '../../getUser'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getTimeAgo } from '@/utility/relativeTime'

const UserHeader = ({ username }) => {
  const [user, setUser] = useState({ data: null, status: null })
  const fetchUser = async () => {
    const fetched = await getUser(username)
    setUser({ ...user, data: fetched?.text, status: fetched?.status })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <section className={styles.userheader}>
      <Link href={`/profile/${user?.data?.username}`}>
        {user?.data?.profile_Picture &&
          <Image
            src={user?.data?.profile_Picture}
            alt={user?.data?.username}
            width={75}
            height={75}
          />}
      </Link>
      <span>
        <h1>
          <Link href={`/profile/${user?.data?.username}`}>
            {user?.data?.username}
          </Link>
        </h1>
        {user?.data?.last_Login && (
          <p>
            Last seen {getTimeAgo(new Date(user?.data?.last_Login).getTime())}
          </p>
        )}
      </span>
    </section>
  )
}

export default UserHeader
