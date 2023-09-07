'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useEffect } from 'react'
import styles from './post.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { getTimeAgo } from '@/utility/relativeTime'
import { useRouter } from 'next/navigation'

const Post = ({ id }) => {
  const { fetchPost, post, changed } = useFetcher()
  const img = []
  const router = useRouter()

  console.log(post)

  useEffect(() => {
    fetchPost(id)
  }, [changed])

  if (post?.data?.images !== undefined) {
    for (let i = 0; i < post?.data?.images.length; i++) {
      img.push(
        <Image
          key={post?.data?.images[i].image_Id}
          src={post?.data?.images[i].image_Url}
          alt={post?.data?.images[i].image_Id}
          onClick={() =>
            router.push(
              `/posts/${post?.data?.post_Id}/image/${post?.data?.images[i].image_Id}`
            )}
          style={{ cursor: 'pointer' }}
          width={150}
          height={150}
        />
      )
    }
  }

  return (
    post?.status === 200 && (
      <article className={styles.post}>
        <section className={styles.postflex}>
          <Link
            href={`/profile/${post?.data?.author}`}
            className={styles.usercontainer}
          >
            {post?.data?.profile_Picture
              ? (
                <Image
                  src={post?.data?.profile_Picture}
                  alt={post?.data?.author}
                  width={50}
                  height={50}
                />
                )
              : (
                <div className={styles.nouser}>?</div>
                )}
            {post?.data?.first_Name && (
              <>
                <h3>
                  {post?.data?.first_Name}{' '}
                  {post?.data?.last_Name && <>{post?.data?.last_Name}</>}
                </h3>
                <h4>(@{post?.data?.author})</h4>
              </>
            )}
            {!post?.data?.first_Name && <h3>@{post?.data?.author}</h3>}
          </Link>
          <section className={styles.date}>
            {post?.data?.modified !== '0001-01-01T00:00:00'
              ? (
                <p>
                  Modified {getTimeAgo(new Date(post?.data?.modified).getTime())}
                </p>
                )
              : (
                <p>
                  Created {getTimeAgo(new Date(post?.data?.created).getTime())}
                </p>
                )}
            <span className={styles.datetooltip} style={{ fontSize: '12px' }}>
              {new Date(post?.data?.created).toLocaleDateString()}
              <span style={{ color: 'rgb(200, 200, 200)' }}>
                {new Date(post?.data?.created).getHours()}:
                {new Date(post?.data?.created).getMinutes()}
              </span>
            </span>
          </section>
        </section>
        <section className={styles.textcontainer}>
          {post?.data?.group_Id && (
            <section className={styles.groupcontainer}>
              <Image
                src={post?.data?.group?.group_Picture}
                alt={post?.data?.group?.group_Name}
                width={75}
                height={75}
              />
              <h1>
                This was originally posted on{' '}
                <Link href={`/groups/${post?.data?.group?.group_Id}`}>
                  {post?.data?.group?.group_Name}
                </Link>
              </h1>
            </section>
          )}
          <p>{post?.data?.content}</p>
          {post?.data?.images.length > 0 && (
            <section className={styles.images}>{img}</section>
          )}
        </section>
      </article>
    )
  )
}

export default Post
