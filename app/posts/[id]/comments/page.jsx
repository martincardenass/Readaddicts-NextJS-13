import getComments from './getComments'
import styles from './comments.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getTimeAgo } from '@/utility/relativeTime'

const CommentsPage = async ({ params }) => {
  const { id } = params
  const comments = await getComments(id)
  const commentsData = comments.data
  const status = comments.status

  if (status === 404) {
    return (
      <h4 style={{ fontWeight: 400, textAlign: 'center' }}>
        {commentsData}
      </h4>
    )
  }

  if (status === 200) {
    return (
      <main className={styles.commentsmain}>
        <article className={styles.comments}>
          <ul>
            {commentsData.map(
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
                          <p className={styles.date}>{getTimeAgo(new Date(comment.created).getTime())}</p>
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
                          <p className={styles.date}>{getTimeAgo(new Date(comment.created).getTime())}</p>
                        </Link>
                        )}
                    {comment.content}

                    {commentsData.map(
                      (childComment) =>
                        childComment.parent_Comment_Id ===
                          comment.comment_Id && (
                            <ul key={childComment.comment_Id} className={styles.childcomments}>
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
                                  <p className={styles.date}>{getTimeAgo(new Date(comment.created).getTime())}</p>
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
        </article>
      </main>
    )
  }
}

export default CommentsPage
