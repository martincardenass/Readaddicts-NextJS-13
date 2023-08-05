'use client'
import getPosts from './getPosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import createPost from './posts/new/createPost'

const DynamicLogin = dynamic(() => import('@/components/Login/Login'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicPosts = dynamic(() => import('./posts/Posts'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicAddPost = dynamic(() => import('./posts/new/page'), {
  loading: () => <h1>Loading...</h1>
})

const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const HomePage = () => {
  const { userStatusCode, user } = useAuth()
  const [posts, setPosts] = useState([])
  const [postsStatus, setPostsStatus] = useState(null)
  const [msg, setMsg] = useState(null)
  const [posted, setPosted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  // * ref and isIntersecting for infinite scroll using IntersectionObserver API
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [page, setPage] = useState(1)

  const handlePost = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    if (formData.content !== '') {
      const data = await createPost(formData.content)
      // * error handling
      if (data.status === 400) {
        const errorText = data.text[0].error
        const replacedErrorText = errorText.replace(
          errorText,
          'Please provide at least 8 characters'
        )
        setMsg(replacedErrorText)
        // * There are only two status responses 400 or 200. Explicit error handling its not necessary just use else
      } else {
        setMsg('Post published successfully') // * Delete any error messages (if any)
        setPosted(true)
        setShowAlert(true)
      }
      // * else formData its empty so the input does not have any info
    } else {
      setMsg('Your post cannot be empty')
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false)
      setPosted(false)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [posted, showAlert])

  const handleIntersection = (entries) => {
    const [entry] = entries
    setIsIntersecting(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(handleIntersection, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  useEffect(() => {
    // const limit = (posts?.length || 0) + 3
    if (isIntersecting) {
      const fetchPosts = async () => {
        const postsData = await getPosts(page, 3)
        setPostsStatus(postsData?.status)

        setPosts(prevPosts => [...prevPosts, ...postsData.data])
        setPage(page + 1)
      }

      fetchPosts()
    }
  }, [isIntersecting])

  useEffect(() => {
    console.log(posts)
  }, [posts])

  return (
    <>
      {userStatusCode === 404 && <DynamicLogin />}
      {userStatusCode === 200 && (
        <>
          {showAlert && <DynamicAlert message='Post added' />}
          <DynamicAddPost
            user={user}
            handlePost={handlePost}
            msg={msg}
            posted={posted}
          />
          <DynamicPosts posts={posts} postsStatus={postsStatus} />
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
      )}
    </>
  )
}

export default HomePage
