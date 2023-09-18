import Image from 'next/image'
import Link from 'next/link'
import styles from './users.module.css'
import Tiers from './Tiers'
import UserButton from './UserButton'

const UsersAndTiers = ({ users, tiers, searchParams }) => {
  const { tier } = searchParams

  // * Params are string convert to integer
  const filteredUsers = tier
    ? users.filter((user) => user.tier_Id === parseInt(tier))
    : users

  return (
    <>
      <Tiers tiers={tiers} id={tier} />
      <section className={styles.users}>
        <ul>
          {filteredUsers?.map((user) => (
            <li key={user.user_Id}>
              <Link href={`/profile/${user.username}`}>
                {user.profile_Picture
                  ? (
                    <Image
                      src={user.profile_Picture}
                      alt={user.username}
                      width={150}
                      height={150}
                    />
                    )
                  : (
                    <div className={styles.nouser}>?</div>
                    )}
              </Link>
              <section>
                {user.first_Name && user.last_Name
                  ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <Link href={`/profile/${user.username}`}>
                        <h1>
                          {user.first_Name} {user.last_Name}
                        </h1>
                      </Link>
                      <Link href={`/profile/${user.username}`}>
                        <h3>@{user.username}</h3>
                      </Link>
                      <UserButton current={user?.username} />
                    </div>
                    )
                  : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <Link href={`/profile/${user.username}`}>
                        <h1>@{user.username}</h1>
                      </Link>
                      <UserButton current={user?.username} />
                    </div>
                    )}
                <p>{user.bio}</p>
              </section>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default UsersAndTiers
