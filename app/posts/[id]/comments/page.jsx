import getComments from './getComments'
import styles from './comments.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CommentsPage = async ({ params }) => {
  const { id } = params
  const comments = await getComments(id)
  const commentsData = comments.data
  const status = comments.status

  if (status === 404) {
    return (
      <h1 className={styles.h1styles}>
        {commentsData} <span className={styles.addcomment}>Add one</span>
      </h1>
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
                          <span className={styles.date}>
                            {new Date(comment.created).toLocaleDateString()}{' '}
                            <span style={{ color: 'rgb(150, 150, 150)' }}>
                              {new Date(comment.created).getHours()}:
                              {new Date(comment.created).getMinutes()}
                            </span>
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
                          <p>{comment.author}</p>
                          <span className={styles.date}>
                            {new Date(comment.created).toLocaleDateString()}{' '}
                            <span style={{ color: 'rgb(150, 150, 150)' }}>
                              {new Date(comment.created).getHours()}:
                              {new Date(comment.created).getMinutes()}
                            </span>
                          </span>
                        </Link>
                        )}
                    {comment.content}
                    <ul className={styles.childcomments}>
                      {commentsData.map(
                        (childComment) =>
                          childComment.parent_Comment_Id ===
                          comment.comment_Id && (
                            <li key={childComment.comment_Id}>
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
                                <span className={styles.date}>
                                  {new Date(comment.created).toLocaleDateString()}{' '}
                                  <span style={{ color: 'rgb(150, 150, 150)' }}>
                                    {new Date(comment.created).getHours()}:
                                    {new Date(comment.created).getMinutes()}
                                  </span>
                                </span>
                              </section>
                              <span>{childComment.content}</span>
                              <p>Reply to this comment</p>
                            </li>
                          )
                      )}
                    </ul>
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
