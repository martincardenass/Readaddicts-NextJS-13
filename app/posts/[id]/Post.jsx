import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import styles from './post.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTimeAgo } from '@/utility/relativeTime'
import { useRouter } from 'next/navigation'

const Post = ({ id }) => {
  const {
    fetchPost,
    post,
    status,
    changed
  } = useFetcher()
  const img = []
  const router = useRouter()

  useEffect(() => {
    fetchPost(id)
  }, [changed])

  if (post.images !== undefined) {
    for (let i = 0; i < post.images.length; i++) {
      img.push(
        <Image
          key={post.images[i].image_Id}
          src={post.images[i].image_Url}
          alt={post.images[i].image_Id}
          onClick={() => router.push(`/posts/${post.post_Id}/image/${post.images[i].image_Id}`)}
          style={{ cursor: 'pointer' }}
          width={150}
          height={150}
        />
      )
    }
  }

  return (
    status === 200 && (
      <article className={styles.post}>
        <section className={styles.postflex}>
          <Link
            href={`/profile/${post.author}`}
            className={styles.usercontainer}
          >
            <Image
              src={post.profile_Picture}
              alt={post.author}
              width={50}
              height={50}
            />
            {post.first_Name && (
              <>
                <h3>
                  {post.first_Name} {post.last_Name && <>{post.last_Name}</>}
                </h3>
                <h4>(@{post.author})</h4>
              </>
            )}
            {!post.first_Name && <h3>@{post.author}</h3>}
          </Link>
          <section className={styles.date}>
            {post.modified !== '0001-01-01T00:00:00'
              ? (
                <p>Modified {getTimeAgo(new Date(post.modified).getTime())}</p>
                )
              : (
                <p>Created {getTimeAgo(new Date(post.created).getTime())}</p>
                )}
            <span className={styles.datetooltip} style={{ fontSize: '12px' }}>
              {new Date(post.created).toLocaleDateString()}
              <span style={{ color: 'rgb(200, 200, 200)' }}>
                {new Date(post.created).getHours()}:
                {new Date(post.created).getMinutes()}
              </span>
            </span>
          </section>
        </section>
        <section className={styles.textcontainer}>
          <p>{post.content}</p>
          {post.images.length > 0 && (
            <section className={styles.images}>{img}</section>
          )}
        </section>
      </article>
    )
  )
}

export default Post
