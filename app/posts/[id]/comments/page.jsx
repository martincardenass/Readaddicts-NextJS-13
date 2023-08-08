'use client'
import styles from './comments.module.css'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const DynamicComments = dynamic(() => import('./Comments'), {
  loading: () => <h3>Loading...</h3>
})

const CommentsPage = ({ params }) => {
  const { fetchComments, comments, commentsStatus } = useFetcher()
  const { id } = params

  useEffect(() => {
    fetchComments(id)
  }, [])

  if (commentsStatus === 404) {
    return <h4 style={{ fontWeight: 400, textAlign: 'center' }}>{comments}</h4>
  }

  if (commentsStatus === 200) {
    return (
      <main className={styles.commentsmain}>
        <article className={styles.comments}>
          <DynamicComments comments={comments} id={id} />
        </article>
      </main>
    )
  }
}

export default CommentsPage
