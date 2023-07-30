'use client'
import { useAuth } from '@/hooks/useAuth'
import getUserComments from './getUserComments'
import { useEffect, useState } from 'react'
import styles from '../posts/listofposts.module.css'
import Image from 'next/image'

const ListOfComents = () => {
  const { user } = useAuth()
  const [comments, setComments] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserComments(user?.user_Id)
      setComments(data.data)
    }

    if (user?.user_Id !== null && user?.user_Id !== undefined) {
      fetchData()
    }
  }, [user])
  return (
    <article className={styles.postslist}>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.post_Id}>
            <div>
              <Image src={comment.profile_Picture} alt={comment.author} width={35} height={35} />
              <h4>{comment.author}</h4>
              <p>
                <span>{new Date(comment.created).toLocaleDateString()}{' '}</span>
                <span style={{ color: 'rgb(150, 150, 150)' }}>
                  {new Date(comment.created).getHours()}:
                  {new Date(comment.created).getMinutes()}
                </span>
              </p>
            </div>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default ListOfComents
