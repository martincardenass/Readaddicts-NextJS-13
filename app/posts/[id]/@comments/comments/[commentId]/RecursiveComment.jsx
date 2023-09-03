import styles from '@/app/posts/[id]/@comments/comments.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getTimeAgo } from '@/utility/relativeTime'

const RecursiveComment = ({ comment, children }) => {
  return (
    <ul>
      {comment.author === 'Anonymous'
        ? (
          <li key={comment.comment_Id}>
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
              <p>{comment.content}</p>
            </section>
          </li>
          )
        : (
          <li key={comment.comment_Id}>
            <section className={styles.usersection}>
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
            </section>
            <p>{comment.content}</p>
            {children}
            <Link
              style={{ textAlign: 'center' }}
              href={`/posts/${comment.post_Id}/comments/${comment.comment_Id}/reply`}
            >
              <b>Leave a reply</b>
            </Link>
            {comment.childComments && (
              <ul>
                {comment.childComments.map((child) => (
                  <RecursiveComment key={child.comment_Id} comment={child} />
                ))}
              </ul>
            )}
          </li>
          )}
    </ul>
  )
}

export default RecursiveComment
