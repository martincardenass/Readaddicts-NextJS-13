import getUser from './getUser'
import Link from 'next/link'
import Image from 'next/image'
import styles from './user.module.css'
import dynamic from 'next/dynamic'
import { crown, userSvg, pencil } from '@/app/svg'

const DynamicPencil = dynamic(() => import('./EditPencil'))

const UserProfile = async ({ params, children }) => {
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
    <article className={styles.userprofile}>
      <section className={styles.userprofilecontainer}>
        <div className={styles.usercontainer}>
          <Image
            src={userdata.profile_Picture}
            alt={userdata.username}
            width={225}
            height={225}
          />
          <div className={styles.usernamecontainer}>
            <span className={styles.flexor}>
              <h1>
                {userdata.first_Name} {userdata.last_Name}
              </h1>
              <h3>({userdata.username})</h3>
            </span>
            <span className={styles.childsection}>
              <p style={{ fontStyle: 'italic' }}>{userdata.bio}</p>
              <div>
                <span>
                  {userdata.role === 'admin' ? crown : userSvg}
                  <p>{userdata.role}</p>
                </span>
                <p>{userdata.gender}</p>
                <p>
                  <b>Status</b>: {userdata.status}
                </p>
              </div>
            </span>
          </div>
          <DynamicPencil pencil={pencil} name={name} />
        </div>
        <nav className={styles.usersmenu}>
          <Link href={`/profile/${name}/posts`}>
            Posts
          </Link>
          <Link href={`/profile/${name}/comments`}>
            Comments
          </Link>
        </nav>
        {children}
      </section>
    </article>
  )
}

export default UserProfile
