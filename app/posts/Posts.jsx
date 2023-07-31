import styles from './posts.module.css'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicMenu = dynamic(() => import('./Menu'))

const Posts = ({ posts, postsStatus }) => {
  return (
    <section className={styles.posts}>
      <h1>Welcome, check out the latest posts</h1>
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
                    <h4>({post.author})</h4>
                  </>
                )}
                {!post.first_Name && (
                  <div className={styles.nofirstname}>
                    <h3>{post.author}</h3>
                  </div>
                )}
              </Link>
              <Link href={`/posts/${post.post_Id}`}>
                <p>
                  <span>{new Date(post.created).toLocaleDateString()}{' '}</span>
                  <span style={{ color: 'rgb(150, 150, 150)' }}>
                    {new Date(post.created).getHours()}:
                    {new Date(post.created).getMinutes()}
                  </span>
                </p>
                <p>{post.content}</p>
              </Link>
              <div className={styles.editicons}>
                <DynamicMenu username={post.author} />
              </div>
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
