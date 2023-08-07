'use client'
import { useEffect, useState } from 'react'
import getUserPosts from './getUserPosts'
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
                <p>
                  <span>{new Date(post.created).toLocaleDateString()} </span>
                  <span style={{ color: 'rgb(150, 150, 150)' }}>
                    {new Date(post.created).getHours()}:
                    {new Date(post.created).getMinutes()}
                  </span>
                </p>
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
    return <h1>{posts}</h1>
  }
}

export default ListOfPosts
