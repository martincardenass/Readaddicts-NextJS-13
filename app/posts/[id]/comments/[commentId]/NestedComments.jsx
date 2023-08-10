import Image from 'next/image'
import Link from 'next/link'
import styles from '../comments.module.css'
import { getTimeAgo } from '@/utility/relativeTime'

const NestedComments = ({ comments, status }) => {
  if (status === 200) {
    return (
      <ul>
        {comments?.map((comment) => (
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
              <Link href={`/profile/${comment.author}`}><b>@{comment.author}</b></Link> replied
              <p className={styles.date}>
                {getTimeAgo(new Date(comment.created).getTime())}
              </p>
            </section>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>
    )
  }
}
export default NestedComments
