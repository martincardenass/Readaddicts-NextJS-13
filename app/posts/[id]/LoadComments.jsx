'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './post.module.css'
import { usePathname } from 'next/navigation'

const LoadComments = ({ id }) => {
  const pathname = usePathname()
  const [toggle, setToggle] = useState(true)

  // * If the pathname is /comments we dont need to display the Show Comments component
  if (!pathname.includes('/comments')) {
    return (
      <>
        {toggle && (
          <section onClick={() => setToggle(!toggle)} className={styles.loadcomments}>
            <h3>
              <Link href={`/posts/${id}/comments`}>
                Show comments
              </Link>
            </h3>
          </section>
        )}
      </>
    )
  }
}

export default LoadComments
