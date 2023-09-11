'use client'
import { useState } from 'react'
import styles from './posts.module.css'
import { useAuth } from '@/context/useAuth'
import Link from 'next/link'

const Menu = ({ username, postId }) => {
  const [toggle, setToggle] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
    setToggle(!toggle)
  }

  if (user?.username === username) {
    return (
      <div className={styles.edituserlogged}>
        <div onClick={handleClick} className={styles.threedots}>
          ...
        </div>
        {toggle && (
          <div className={styles.popmenuuserlogged}>
            <p>
              <Link href={`/posts/${postId}/edit`}>Edit post</Link>
            </p>
            <p>
              <Link href={`/posts/${postId}/comments`}>See comments</Link>
            </p>
            <p>
              <Link href={`/posts/${postId}/delete`}>Delete post</Link>
            </p>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className={styles.edituserlogged}>
        <div onClick={handleClick} className={styles.threedots}>
          ...
        </div>
        {toggle && (
          <div className={styles.popupmenu}>
            <p>
              <Link href={`/posts/${postId}`}>Leave a comment</Link>
            </p>
            <p>
              <Link href={`/posts/${postId}/comments`}>See comments</Link>
            </p>
          </div>
        )}
      </div>
    )
  }
}

export default Menu
