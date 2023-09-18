import getUser from './getUser'
import Link from 'next/link'
import Image from 'next/image'
import styles from './user.module.css'
import dynamic from 'next/dynamic'
import Header from './Header'
import { getTimeAgo } from '@/utility/relativeTime'

const DynamicPencil = dynamic(() => import('./EditPencil'))
const DynamicUserMenu = dynamic(() => import('./UserMenu'))

const UserProfile = async (props) => {
  const { name } = props.params
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
    <article className={styles.userprofile}>
      <section className={styles.userprofilecontainer}>
        <div className={styles.usercontainer}>
          <span>
            {userdata.profile_Picture
              ? (
                <Image
                  src={userdata.profile_Picture}
                  alt={userdata.username}
                  width={225}
                  height={225}
                />
                )
              : (
                <div className={styles.nouser}>?</div>
                )}
          </span>
          <div className={styles.usernamecontainer}>
            <Header userdata={userdata} />
            <p>{userdata.tier_Name}</p>
            {userdata?.last_Login && (
              <p className={styles.time}>Last seen {getTimeAgo(new Date(userdata?.last_Login).getTime())}</p>
            )}
            <p style={{ fontStyle: 'italic' }}>{userdata.bio}</p>
          </div>
          <DynamicPencil name={name} />
        </div>
        <DynamicUserMenu name={name} />
        {props.children}
      </section>
      {props.groups}
    </article>
  )
}

export default UserProfile
