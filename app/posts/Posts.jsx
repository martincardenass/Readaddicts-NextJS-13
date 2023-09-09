import styles from './posts.module.css'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTimeAgo } from '@/utility/relativeTime'
import Menu from './Menu'
import Icons from './Icons'

const DynamicImages = dynamic(() => import('./Images'))

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
                <div className={styles.usercontainerwrapper}>
                  {post.profile_Picture
                    ? (
                      <Image
                        src={post.profile_Picture}
                        alt={post.author}
                        width={50}
                        height={50}
                      />
                      )
                    : (
                      <div className={styles.nouser}>?</div>
                      )}
                  {post.first_Name && (
                    <>
                      <h3>
                        {post.first_Name}{' '}
                        {post.last_Name && <>{post.last_Name}</>}
                      </h3>
                      <h4>@{post.author}</h4>
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
                      <p>
                        Created {getTimeAgo(new Date(post.created).getTime())}
                      </p>
                      )}
                </div>
              </Link>
              <Link href={`/posts/${post.post_Id}`}>
                <p>{post.content}</p>
              </Link>
              {post.images.length > 0 && (
                <DynamicImages
                  images={post.images}
                  href={`/posts/${post.post_Id}`}
                />
              )}
              <Menu username={post.author} postId={post.post_Id} />
              <Icons id={post.post_Id} commentCount={post.comments} />
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
