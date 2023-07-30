import getComments from './getComments'
import styles from './comments.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CommentsPage = async ({ params }) => {
  const { id } = params
  const comments = await getComments(id)
  const commentsData = comments.data
  return (
    <article className={styles.comments}>
      <ul>
        {commentsData.map((comment) => comment.parent_Comment_Id === null && (
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
                  <p>
                    <span>{comment.author}</span> says...
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
                  <p>
                    <span>{comment.author}</span> says
                  </p>
                </Link>
                )}
            <section>
              {comment.content}
              <span className={styles.date}>
                {new Date(comment.created).toLocaleDateString()}{' '}
                <span style={{ color: 'rgb(150, 150, 150)' }}>
                  {new Date(comment.created).getHours()}:
                  {new Date(comment.created).getMinutes()}
                </span>
              </span>
            </section>
            <ul className={styles.childcomments}>
              {commentsData.map(childComment => (
                childComment.parent_Comment_Id === comment.comment_Id && (
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
                      <p>
                        <span>{childComment.author}</span> replied
                      </p>
                    </section>
                    <p>{childComment.content}</p>
                  </li>
                )
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default CommentsPage
