import styles from './posts.module.css'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTimeAgo } from '@/utility/relativeTime'

const DynamicMenu = dynamic(() => import('./Menu'))
const DynamicIcons = dynamic(() => import('./Icons'))

const Posts = ({ posts, postsStatus }) => {
  return (
    <section className={styles.posts}>
      {postsStatus === 200 && (
        <ul>
          {posts.map((post) => (
            <li key={post.post_Id}>
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
                <p>{getTimeAgo(new Date(post.created).getTime())}</p>
              </Link>
              <Link href={`/posts/${post.post_Id}`}>
                <p>{post.content}</p>
              </Link>
              <DynamicMenu username={post.author} />
              <DynamicIcons id={post.post_Id} />
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
