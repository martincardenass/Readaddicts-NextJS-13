'use client'
import getUserComments from './getUserComments'
import { useEffect, useState } from 'react'
import styles from '../posts/listofposts.module.css'
import Image from 'next/image'
import { getTimeAgo } from '@/utility/relativeTime'

const ListOfComents = ({ name }) => {
  const [comments, setComments] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserComments(name)
      setComments(data.data)
      setStatus(data.status)
    }

    fetchData()
  }, [name])

  if (status === 200) {
    return (
      <article className={styles.postslist}>
        <ul>
          {comments && comments?.map((comment) => (
            <li key={comment.post_Id}>
              <div>
                <Image src={comment.profile_Picture} alt={comment.author} width={35} height={35} />
                <h4>@{comment.author}</h4>
                {comment.modified !== '0001-01-01T00:00:00'
                  ? (
                    <span>
                      Modified {getTimeAgo(new Date(comment.modified).getTime())}
                    </span>
                    )
                  : (
                    <span>
                      Created {getTimeAgo(new Date(comment.created).getTime())}
                    </span>
                    )}
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </article>
    )
  }

  if (status === 404) {
    return <h1>{comments}</h1>
  }
}

export default ListOfComents
