import getPost from './getPost'
import Image from 'next/image'
import Link from 'next/link'
import styles from './post.module.css'
import dynamic from 'next/dynamic'

const DynamicLoadComments = dynamic(() => import('./LoadComments'))

const page = async ({ params, children }) => {
  const { id } = params
  const post = await getPost(id)
  const postData = post.data
  return (
    <>
      {post.status === 200 && (
        <article className={styles.post}>
          <section className={styles.postflex}>
            <Link href={`/profile/${postData.author}`} className={styles.usercontainer}>
              <Image
                src={postData.profile_Picture}
                alt={postData.author}
                width={75}
                height={75}
              />
              <div className={styles.usercontainertext}>
                {/* <p>This was posted by:</p> */}
                <h1>{postData.author}</h1>
              </div>
            </Link>
            <section className={styles.textcontainer}>
              <p>{postData.content}</p>
              <span>{new Date(postData.created).toLocaleDateString()}{' '}
                <span style={{ color: 'rgb(150, 150, 150)' }}>
                  {new Date(postData.created).getHours()}:
                  {new Date(postData.created).getMinutes()}
                </span>
              </span>
            </section>
          </section>
        </article>
      )}
      {post.status === 404 && <p>{post.data}</p>}
      <DynamicLoadComments id={id} />
      {children}
    </>
  )
}

export default page
