'use client'
import { createContext, useContext, useState } from 'react'
import getPost from '@/app/posts/[id]/getPost'
import updatePost from '@/app/posts/[id]/edit/updatePost'
import getComments from '@/app/posts/[id]/comments/getComments'
import createComment from '@/app/posts/[id]/comments/postComment'
import errorTextReplace from '@/utility/errorTextReplace'

const FetcherContext = createContext(null)

export const Fetcher = ({ children }) => {
  // * Posts
  const [post, setPost] = useState({})
  const [status, setStatus] = useState(null)
  const [msg, setMsg] = useState(null)
  const [changed, setChanged] = useState(false) // * Track changes to re-fetch

  const fetchPost = async (id) => {
    const fetched = await getPost(id)
    setPost(fetched.data)
    setStatus(fetched.status)
  }

  const patchPost = async (id, content) => {
    const data = await updatePost(id, content)
    setMsg(data)

    if (data.status === 400) {
      const replacedErrorText = errorTextReplace(data)
      setMsg(replacedErrorText)
    } else {
      setMsg('Post updated successfully')
    }

    setChanged(true)

    setTimeout(() => {
      setChanged(false)
    }, 3000)
  }

  // * Comments
  const [comments, setComments] = useState({})
  const [commentsStatus, setCommentsStatus] = useState(null)
  const [commentsPost, setCommentsPost] = useState(null)
  const [commentPosted, setCommentPosted] = useState(false)
  const [commentPostedResponse, setCommentPostedResponse] = useState(null)

  const fetchComments = async (postId) => {
    const fetched = await getComments(postId)
    setComments(fetched.data)
    setCommentsStatus(fetched.status)
  }

  const createAComment = async (postId, content) => {
    const response = await createComment(postId, content)

    if (response.status === 400) {
      const text = errorTextReplace(response)

      const replacedErrorText = text?.replace(
        text, '8 characters min'
      )
      setCommentPostedResponse(replacedErrorText)
    } else {
      setCommentPostedResponse(response.data)
      setCommentsPost(response)
      setCommentPosted(true)

      setTimeout(() => {
        setCommentPosted(false)
      }, 3000)
    }
  }

  return (
    <FetcherContext.Provider
      value={{
        post,
        status,
        msg,
        changed,
        comments,
        commentsStatus,
        commentPostedResponse,
        commentPosted,
        commentsPost,
        fetchPost,
        patchPost,
        fetchComments,
        createAComment
      }}
    >
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => useContext(FetcherContext)
