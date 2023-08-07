'use client'
import { useAuth } from '@/hooks/useAuth'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './post.module.css'

const Options = ({ username, id }) => {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <>
      <h2>Options</h2>
      {user?.username === username && (
        <section className={styles.options}>
          <section className={styles.optionscontainer}>
            <Link href={`/posts/${id}/delete`}>
              <span className='material-symbols-outlined'>delete</span>
              <span className={pathname.includes('/delete') ? styles.active : ''}>Delete post</span>
            </Link>
            <Link href={`/posts/${id}/edit`}>
              <span className='material-symbols-outlined'>edit_note</span>
              <span className={pathname.includes('/edit') ? styles.active : ''}>Edit post</span>
            </Link>
          </section>
        </section>
      )}
      {user?.username !== username && <p>Not logged in user options</p>}
    </>
  )
}

export default Options
