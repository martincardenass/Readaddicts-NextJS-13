import getPost from './getPost'
import Image from 'next/image'
import Link from 'next/link'
import styles from './post.module.css'
import dynamic from 'next/dynamic'
import { getTimeAgo } from '@/utility/relativeTime'

const DynamicLoadComments = dynamic(() => import('./LoadComments'))
const DynamicAddComment = dynamic(() => import('./comments/AddComent'))
const DynamicOptions = dynamic(() => import('./Options'))
const DynamicComments = dynamic(() => import('./CommentsChild'))
const DynamicDeletePost = dynamic(() => import('./DeleteChild'))
const DynamicUpdatePost = dynamic(() => import('./UpdateChild'))

const Post = async ({ params, children }) => {
  const { id } = params
  const post = await getPost(id)
  const postData = post.data

  return (
    <main className={styles.postpage}>
      {post.status === 200 && (
        <article className={styles.post}>
          <section className={styles.postflex}>
            <Link
              href={`/profile/${postData.author}`}
              className={styles.usercontainer}
            >
              <Image
                src={postData.profile_Picture}
                alt={postData.author}
                width={50}
                height={50}
              />
              {postData.first_Name && (
                <>
                  <h3>
                    {postData.first_Name}{' '}
                    {postData.last_Name && <>{postData.last_Name}</>}
                  </h3>
                  <h4>(@{postData.author})</h4>
                </>
              )}
              {!postData.first_Name && <h3>@{postData.author}</h3>}
            </Link>
            <section className={styles.date}>
              {postData.modified !== '0001-01-01T00:00:00'
                ? (
                  <p>
                    Modified {getTimeAgo(new Date(postData.modified).getTime())}
                  </p>
                  )
                : (
                  <p>
                    Created {getTimeAgo(new Date(postData.created).getTime())}
                  </p>
                  )}
              <span className={styles.datetooltip} style={{ fontSize: '12px' }}>
                {new Date(postData.created).toLocaleDateString()}
                <span style={{ color: 'rgb(200, 200, 200)' }}>
                  {new Date(postData.created).getHours()}:
                  {new Date(postData.created).getMinutes()}
                </span>
              </span>
            </section>
          </section>
          <section className={styles.textcontainer}>
            <p>{postData.content}</p>
          </section>
          <DynamicOptions username={postData.author} id={id} />
          {/* This children uses conditional rendering based on the pathname */}
          <DynamicDeletePost>{children}</DynamicDeletePost>
          <DynamicUpdatePost>{children}</DynamicUpdatePost>
        </article>
      )}
      <div>
        <DynamicAddComment postId={id} />
        <DynamicLoadComments id={id} />
        <DynamicComments>{children}</DynamicComments>
      </div>
      {post.status === 404 && <p>{post.data}</p>}
    </main>
  )
}

export default Post
