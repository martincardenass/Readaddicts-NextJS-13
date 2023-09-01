'use client'
import { useAuth } from '@/hooks/useAuth'
import { useFetcher } from '@/hooks/useFetcher'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './post.module.css'

const Options = ({ id }) => {
  const pathname = usePathname()
  const { user } = useAuth()
  const { post } = useFetcher()

  const username = post?.data?.author

  return (
    <>
      {user?.username === username && (
        <>
          <h2 style={{ textAlign: 'center' }}>Options</h2>
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
        </>
      )}
    </>
  )
}

export default Options
