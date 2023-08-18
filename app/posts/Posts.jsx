import styles from './posts.module.css'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTimeAgo } from '@/utility/relativeTime'

const DynamicMenu = dynamic(() => import('./Menu'))
const DynamicIcons = dynamic(() => import('./Icons'))
const DynamicImages = dynamic(() => import('./Images'))

const Posts = ({ posts, postsStatus }) => {
  return (
    <section className={styles.posts}>
      {postsStatus === 200 && (
        <ul className={styles.postsul}>
          {posts.map((post) => (
            <li className={styles.postsli} key={post.post_Id}>
              <Link
                href={`/profile/${post.author}`}
                className={styles.usercontainer}
              >
                <Image
                  src={post.profile_Picture}
                  alt={post.author}
                  width={45}
                  height={45}
                />
                {post.first_Name && (
                  <>
                    <h3>
                      {post.first_Name}{' '}
                      {post.last_Name && <>{post.last_Name}</>}
                    </h3>
                    <h4>(@{post.author})</h4>
                  </>
                )}
                {!post.first_Name && <h3>@{post.author}</h3>}
                {post.modified !== '0001-01-01T00:00:00'
                  ? (
                    <p>
                      Modified {getTimeAgo(new Date(post.modified).getTime())}
                    </p>
                    )
                  : (
                    <p>Created {getTimeAgo(new Date(post.created).getTime())}</p>
                    )}
              </Link>
              <Link href={`/posts/${post.post_Id}`}>
                <p>{post.content}</p>
              </Link>
              {post.images.length > 0 && <DynamicImages images={post.images} href={`/posts/${post.post_Id}`} />}
              <DynamicMenu username={post.author} postId={post.post_Id} />
              <DynamicIcons id={post.post_Id} commentCount={post.comments} />
            </li>
          ))}
        </ul>
      )}
      {postsStatus === 404 && (
        <>
          <p>{postsStatus}</p>
          <p>{posts}</p>
        </>
      )}
      {postsStatus === 400 && <p>Internal server error, please contact me</p>}
    </section>
  )
}

export default Posts
