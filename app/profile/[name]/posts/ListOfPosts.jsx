'use client'
import { useEffect, useState } from 'react'
import getUserPosts from './getUserPosts'
import styles from './listofposts.module.css'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

const ListOfPosts = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserPosts(user?.user_Id)
      setPosts(data.data)
    }

    if (user?.user_Id !== null && user?.user_Id !== undefined) {
      fetchData()
    }
  }, [user])

  return (
    <article className={styles.postslist}>
      <ul>
        {posts?.map((post) => (
          <li key={post.post_Id}>
            <div>
              <Image src={post.profile_Picture} alt={post.author} width={35} height={35} />
              <h4>{post.author}</h4>
              <p>
                <span>{new Date(post.created).toLocaleDateString()}{' '}</span>
                <span style={{ color: 'rgb(150, 150, 150)' }}>
                  {new Date(post.created).getHours()}:
                  {new Date(post.created).getMinutes()}
                </span>
              </p>
            </div>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ListOfPosts
