'use client'
import getUserComments from './getUserComments'
import { useRef, useState } from 'react'
import IntersectedContent from '@/utility/intersectionObserver'

const ListOfComents = ({ name }) => {
  const [comments, setComments] = useState({ data: [], status: null })
  const [page, setPage] = useState(1)

  const ref = useRef(null)

  const fetchUserComments = async () => {
    // * Page is 1, 10 for the number of comments to fetch
    const data = await getUserComments(page, 10, `User/${name}/comments`)

    setComments((prevComments) => ({
      ...comments,
      data: [...prevComments.data, ...data?.data],
      status: data?.status
    }))

    setPage(page + 1)
  }

  return (
    <>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: 0,
          fontWeight: 500,
          padding: '0 2.5rem'
        }}
      >
        Showing only post comments
      </h2>
      <IntersectedContent
        reference={ref}
        func={fetchUserComments}
        comments={comments}
      />
      <p
        ref={ref}
        style={{
          textAlign: 'center',
          marginTop: '-2rem',
          userSelect: 'none'
        }}
      >
        .
      </p>
    </>
  )
}

export default ListOfComents
