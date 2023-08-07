'use client'
import styles from './user.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const UserMenu = ({ name }) => {
  const pathname = usePathname()

  return (
    <nav className={styles.usersmenu}>
      <Link href={`/profile/${name}/posts`} className={pathname === `/profile/${name}/posts` ? styles.active : ''}>Posts</Link>
      <Link href={`/profile/${name}/comments`} className={pathname === `/profile/${name}/comments` ? styles.active : ''}>Comments</Link>
    </nav>
  )
}

export default UserMenu
