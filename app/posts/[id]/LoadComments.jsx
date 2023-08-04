'use client'
import styles from './post.module.css'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const LoadComments = ({ id }) => {
  const pathname = usePathname()

  // * If the pathname is /comments we dont need to display the Show Comments component
  if (!pathname.includes('/comments')) {
    return (
      <>
        <section className={styles.loadcomments}>
          <DynamicButton
            text='Show comments'
            href={`/posts/${id}/comments`}
            backgroundColor='white'
            width='150px'
            effectColor='rgb(235, 235, 235)'
            effectWidth='150px'
            effectHeight='150px'
          />
        </section>
      </>
    )
  }
}

export default LoadComments
