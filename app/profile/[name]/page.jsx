import getUser from './getUser'
import Link from 'next/link'
import Image from 'next/image'
import styles from './user.module.css'

const UserProfile = async ({ params }) => {
  const { name } = params
  const user = await getUser(name)
  const userdata = user.text

  // * If user does not exists we 404
  if (user.status === 404) {
    return (
      <section className={styles.fourzerofour}>
        <h1>{user.status} Not Found</h1>
        <h3>{user.text}.</h3>
        <span className={styles.registerlink}>
          <Link href='/register'>Register using this username</Link>
        </span>
      </section>
    )
  }

  // * If exists return the user
  return (
    <section className={styles.userprofile}>
      <h1>{userdata.username}</h1>
      <Image src={userdata.profile_Picture} alt={userdata.username} width={200} height={200} />
      <p>{userdata.first_Name} {userdata.last_Name}</p>
      <p>{userdata.email}</p>
      <p>{userdata.role}</p>
      <p>{userdata.gender}</p>
      <p>{userdata.birthday}</p>
      <p>"{userdata.bio}"</p>
      <p>{userdata.status}</p>
    </section>
  )
}

export default UserProfile
