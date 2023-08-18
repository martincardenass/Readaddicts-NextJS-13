import Link from 'next/link'
import Image from 'next/image'
import styles from './comments.module.css'
import { getTimeAgo } from '@/utility/relativeTime'

const Comments = ({ comments, id }) => {
  return (
    <ul>
      {comments?.map(
        (comment) =>
          comment.parent_Comment_Id === null && (
            <li key={comment.comment_Id}>
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
                    <p className={styles.date}>
                      {getTimeAgo(new Date(comment.created).getTime())}
                    </p>
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
                    <p className={styles.date}>
                      {getTimeAgo(new Date(comment.created).getTime())}
                    </p>
                  </Link>
                  )}
              <p>{comment.content}</p>
              <div className={styles.contentsection}>
                {comment.replies > 0
                  ? (
                    <b>
                      <Link href={`/posts/${id}/comments/${comment.comment_Id}`}>
                        {comment.replies} replies
                      </Link>
                    </b>
                    )
                  : (
                    <b>
                      <Link href={`/posts/${id}/comments/${comment.comment_Id}/reply`}>
                        Leave a reply
                      </Link>
                    </b>
                    )}
              </div>
            </li>
          )
      )}
    </ul>
  )
}

export default Comments
