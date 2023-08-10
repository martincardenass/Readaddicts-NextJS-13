'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../comments.module.css'
import { getTimeAgo } from '@/utility/relativeTime'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const DynamicNestedComments = dynamic(() => import('./NestedComments'), {
  loading: () => <h4 style={{ textAlign: 'center' }}>Loading...</h4>
})

const CommentIdPage = ({ params, children }) => {
  const {
    fetchComment,
    comment,
    commentStatus,
    commentPosted,
    fetchChildComments,
    childComment,
    childCommentStatus
  } = useFetcher()
  const { commentId, id } = params
  const pathname = usePathname()

  useEffect(() => {
    fetchComment(commentId)
    fetchChildComments(commentId)
  }, [commentPosted])

  if (commentStatus === 404) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>Not Found</h3>
        <Link href={`/posts/${id}/comments`}>Go back</Link>
      </div>
    )
  }

  if (commentStatus === 200) {
    return (
      <>
        <section className={styles.comment}>
          {comment.author === 'Anonymous'
            ? (
              <section className={styles.usersection}>
                {comment.profile_Picture && (
                  <Image
                    src={comment.profile_Picture}
                    alt={comment.author}
                    width={40}
                    height={40}
                  />
                )}
                <p>{comment.author}</p>
                <span className={styles.date}>
                  {getTimeAgo(new Date(comment.created).getTime())}
                </span>
              </section>
              )
            : (
              <Link
                href={`/profile/${comment.author}`}
                className={styles.usersection}
              >
                {comment.profile_Picture && (
                  <Image
                    src={comment.profile_Picture}
                    alt={comment.author}
                    width={40}
                    height={40}
                  />
                )}
                <h4>@{comment.author}</h4>
                <span className={styles.date}>
                  {getTimeAgo(new Date(comment.created).getTime())}
                </span>
              </Link>
              )}
          <p>{comment.content}</p>
          <p />
          {childCommentStatus === 200 && (
            <DynamicNestedComments
              comments={childComment}
              status={childCommentStatus}
            />
          )}
          {!pathname.includes('/reply')
            ? (
              <Link style={{ textAlign: 'center' }} href={`/posts/${id}/comments/${commentId}/reply`}>
                <b>Leave a reply</b>
              </Link>
              )
            : (
              <Link style={{ textAlign: 'center' }} href={`/posts/${id}/comments/${commentId}`}>
                <b>Close window</b>
              </Link>
              )}
          {children}
        </section>
        <div style={{ textAlign: 'center' }}>
          <h3>
            <Link href={`/posts/${id}/comments`}>Back to all comments</Link>
          </h3>
        </div>
      </>
    )
  }
}

export default CommentIdPage
