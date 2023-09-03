'use client'
import styles from './comments.module.css'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const DynamicComments = dynamic(() => import('./Comments'), {
  loading: () => <h3 style={{ textAlign: 'center', fontWeight: 500 }}>Loading comments...</h3>
})

const CommentsPage = ({ params }) => {
  const { fetchComments, comments, commentPosted } = useFetcher()
  const { id } = params

  useEffect(() => {
    fetchComments(id)
  }, [commentPosted])

  if (comments?.status === 404) {
    return <h4 style={{ fontWeight: 400, textAlign: 'center' }}>{comments?.data}</h4>
  }

  if (comments?.status === 200) {
    return (
      <main className={styles.comments}>
        <DynamicComments comments={comments?.data} id={id} />
      </main>
    )
  }
}

export default CommentsPage
