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
                    <p>@{comment.author}</p>
                    <p className={styles.date}>
                      {getTimeAgo(new Date(comment.created).getTime())}
                    </p>
                  </Link>
                  )}
              <Link href={`/posts/${id}/comments/${comment.comment_Id}`}>
                {comment.content}
              </Link>
              <p>Leave a reply</p>
              {comments?.map(
                (childComment) =>
                  childComment.parent_Comment_Id ===
                  comment.comment_Id && (
                    <ul
                      key={childComment.comment_Id}
                      className={styles.childcomments}
                    >
                      <li>
                        <section className={styles.usersection}>
                          {childComment.profile_Picture && (
                            <Image
                              src={childComment.profile_Picture}
                              alt={childComment.author}
                              width={40}
                              height={40}
                            />
                          )}
                          <p>{childComment.author}</p> replied
                          <p className={styles.date}>
                            {getTimeAgo(
                              new Date(comment.created).getTime()
                            )}
                          </p>
                        </section>
                        <span>{childComment.content}</span>
                      </li>
                    </ul>
                  )
              )}
            </li>
          )
      )}
    </ul>
  )
}

export default Comments
