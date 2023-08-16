'use client'
import { useEffect, useState } from 'react'
import getUserPosts from './getUserPosts'
import { getTimeAgo } from '@/utility/relativeTime'
import styles from './listofposts.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ListOfPosts = ({ name }) => {
  const [posts, setPosts] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserPosts(name)
      setPosts(data.data)
      setStatus(data.status)
    }

    fetchData()
  }, [name])

  if (status === 200) {
    return (
      <article className={styles.postslist}>
        <ul>
          {posts?.map((post) => (
            <li key={post.post_Id}>
              <div>
                <Image
                  src={post.profile_Picture}
                  alt={post.author}
                  width={35}
                  height={35}
                />
                <h4>@{post.author}</h4>
                {post.modified !== '0001-01-01T00:00:00'
                  ? (
                    <span>
                      Modified {getTimeAgo(new Date(post.modified).getTime())}
                    </span>
                    )
                  : (
                    <span>
                      Created {getTimeAgo(new Date(post.created).getTime())}
                    </span>
                    )}
              </div>
              <p>
                <Link href={`/posts/${post.post_Id}`}>{post.content}</Link>
              </p>
            </li>
          ))}
        </ul>
      </article>
    )
  }

  if (status === 404) {
    return (
      <div className={styles.errormessage}>
        <h1>{posts}</h1>
      </div>
    )
  }
}

export default ListOfPosts
