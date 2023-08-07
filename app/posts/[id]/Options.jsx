'use client'
import deletePost from '../delete/deletePost'
import styles from './post.module.css'
import { useAuth } from '@/hooks/useAuth'

const Options = ({ username }) => {
  const { user } = useAuth()

  return (
    <>
      <h2>Options</h2>
      {user?.username === username && (
        <section className={styles.options}>
          <p>Delete post {username}</p>
        </section>
      )}
      {user?.username !== username && (
        <p>Not logged in user options</p>
      )}
    </>
  )
}

export default Options
