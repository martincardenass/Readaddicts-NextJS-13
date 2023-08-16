import getUsers from './getUsers'
import Image from 'next/image'
import Link from 'next/link'
import styles from './users.module.css'

const Users = async () => {
  const users = await getUsers()

  return (
    <section className={styles.users}>
      <ul>
        {users.data.map((user) => (
          <li key={user.user_Id}>
            <section className={styles.usercontainer}>
              <Link href={`/profile/${user.username}`}>
                <Image
                  src={user.profile_Picture}
                  alt={user.username}
                  width={200}
                  height={200}
                />
              </Link>
              <Link href={`/profile/${user.username}`}>
                <h1>{user.username}</h1>
              </Link>
              <p>
                {user.gender} · {user.role}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
