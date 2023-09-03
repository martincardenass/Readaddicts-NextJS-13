'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '@/app/posts/[id]/@comments/comments.module.css'
import dynamic from 'next/dynamic'

const DynamicRecursiveComments = dynamic(() => import('./RecursiveComment'), {
  loading: () => <h4 style={{ textAlign: 'center' }}>Loading...</h4>
})

const CommentIdPage = ({ params, children }) => {
  const {
    fetchComment,
    comment,
    commentPosted
  } = useFetcher()
  const { commentId, id } = params

  useEffect(() => {
    fetchComment(commentId)
  }, [commentPosted])

  if (comment?.status === 404) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Not Found</h3>
        <Link href={`/posts/${id}/comments`}>Go back</Link>
      </div>
    )
  }

  if (comment?.status === 200) {
    return (
      <aside className={styles.asidecomment}>
        <section className={styles.comment}>
          <ul>
            {comment?.data.map(comment => (
              <DynamicRecursiveComments key={comment.comment_Id} comment={comment}>{children}</DynamicRecursiveComments>
            ))}
          </ul>
        </section>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontWeight: 500 }}>
            <Link href={`/posts/${id}`}>Back to all comments</Link>
          </h3>
        </div>
      </aside>
    )
  }
}

export default CommentIdPage
