'use client'
import { useAuth } from '@/context/useAuth'
import { useFetcher } from '@/context/useFetcher'
import styles from './post.module.css'
import { useState } from 'react'
// import { useParams } from 'next/navigation'

const Options = ({ update, remove }) => {
  // const params = useParams()

  // const paramsHaveCommentId = Object.prototype.hasOwnProperty.call(params, 'commentId')

  const [toggle, setToggle] = useState({
    update: false,
    remove: false
  })
  const { user } = useAuth()
  const { post } = useFetcher()

  const username = post?.data?.author

  return (
    user?.username === username && (
      <>

        <section className={styles.options}>
          <section className={styles.optionscontainer}>
            <h2 style={{ textAlign: 'center', fontWeight: 500, fontSize: '32px' }}>Post options</h2>
            <span
              onClick={() => setToggle({ remove: true })}
              style={{ color: toggle.remove ? 'red' : 'black' }}
              className='material-symbols-outlined'
            >
              delete
            </span>
            <span
              onClick={() => setToggle({ update: true })}
              style={{ color: toggle.update ? 'purple' : 'black' }}
              className='material-symbols-outlined'
            >
              edit_note
            </span>
          </section>
        </section>
        {toggle.update && update}
        {toggle.remove && remove}
      </>
    )
  )
}

export default Options
