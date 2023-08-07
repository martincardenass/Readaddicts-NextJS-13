'use client'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import styles from './post.module.css'

const Options = ({ username, id }) => {
  const { user } = useAuth()

  return (
    <>
      <h2>Options</h2>
      {user?.username === username && (
        <section className={styles.options}>
          <section className={styles.optionscontainer}>
            <Link href={`/posts/${id}/delete`}>
              <span className='material-symbols-outlined'>delete</span>
              Delete post
            </Link>
            <Link href={`/posts/${id}/edit`}>
              <span className='material-symbols-outlined'>edit_note</span>
              Edit post
            </Link>
          </section>
        </section>
      )}
      {user?.username !== username && <p>Not logged in user options</p>}
    </>
  )
}

export default Options
