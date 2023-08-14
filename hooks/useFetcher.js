'use client'
import { createContext, useContext, useReducer } from 'react'
import getPost from '@/app/posts/[id]/getPost'
import updatePost from '@/app/posts/[id]/edit/updatePost'
import getComments from '@/app/posts/[id]/comments/getComments'
import getComment from '@/app/posts/[id]/comments/getComment'
import getChildComments from '@/app/posts/[id]/comments/getChildComments'
import createComment from '@/app/posts/[id]/comments/postComment'
import errorTextReplace from '@/utility/errorTextReplace'

const FetcherContext = createContext(null)

// * useReducer implementation
const initialState = {
  // * Of posts
  post: {},
  status: null,
  msg: null,
  changed: false,

  // * of comments
  comments: {},
  commentsStatus: null,
  commentsPost: null,
  commentPosted: false,
  commentPostedResponse: null,
  comment: null,
  commentStatus: null,
  childComment: null,
  childCommentStatus: null
}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case 'FETCH_POST': {
      return {
        ...state,
        post: actionPayload.data,
        status: actionPayload.status
      }
    }

    case 'PATCH_POST': {
      const data = actionPayload

      if (data.status === 400) {
        const replacedErrorText = errorTextReplace(data)
        return {
          ...state,
          msg: replacedErrorText
        }
      } else {
        return {
          ...state,
          msg: 'Post update success',
          changed: true
        }
      }
    }

    case 'SET_CHANGE_FALSE': {
      return {
        ...state,
        changed: false
      }
    }

    case 'FETCH_COMMENTS': {
      return {
        ...state,
        comments: actionPayload.data,
        commentsStatus: actionPayload.status
      }
    }

    case 'CREATE_COMMENT': {
      const data = actionPayload

      if (data.status === 400) {
        const replacedErrorText = errorTextReplace(data)
        return {
          ...state,
          commentPostedResponse: replacedErrorText
        }
      } else {
        return {
          ...state,
          commentPostedResponse: actionPayload.data,
          commentsPost: actionPayload,
          commentPosted: true
        }
      }
    }

    case 'SET_COMMENT_POSTED_FALSE': {
      return {
        ...state,
        commentPosted: false
      }
    }

    case 'FETCH_COMMENT': {
      return {
        ...state,
        comment: actionPayload.data,
        commentStatus: actionPayload.status
      }
    }

    case 'FETCH_CHILDREN_COMMENTS': {
      return {
        ...state,
        childComment: actionPayload.data,
        childCommentStatus: actionPayload.status
      }
    }
  }
  return state
}

export const Fetcher = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // * Posts

  const fetchPost = async (id) => {
    try {
      const fetched = await getPost(id)
      dispatch({
        type: 'FETCH_POST',
        payload: fetched
      })
    } catch (error) {
      console.error(error)
    }
  }

  const patchPost = async (id, content) => {
    try {
      const data = await updatePost(id, content)
      console.log(data)
      dispatch({
        type: 'PATCH_POST',
        payload: data
      })
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => {
      dispatch({
        type: 'SET_CHANGE_FALSE'
      })
    }, 3000)
  }

  // * Comments
  const fetchComments = async (postId) => {
    try {
      const fetched = await getComments(postId)
      dispatch({
        type: 'FETCH_COMMENTS',
        payload: fetched
      })
    } catch (error) {
      console.error(error)
    }
  }

  const createAComment = async (postId, content, parent) => {
    try {
      const response = await createComment(postId, content, parent)
      dispatch({
        type: 'CREATE_COMMENT',
        payload: response
      })
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => {
      dispatch({
        type: 'SET_COMMENT_POSTED_FALSE'
      })
    }, 3000)
  }

  const fetchComment = async (commentId) => {
    try {
      const fetched = await getComment(commentId)
      dispatch({
        type: 'FETCH_COMMENT',
        payload: fetched
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchChildComments = async (commentId) => {
    try {
      const fetched = await getChildComments(commentId)
      dispatch({
        type: 'FETCH_CHILDREN_COMMENTS',
        payload: fetched
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FetcherContext.Provider
      value={{
        post: state.post,
        status: state.status,
        msg: state.msg,
        changed: state.changed,
        comments: state.comments,
        commentsStatus: state.commentsStatus,
        commentPostedResponse: state.commentPostedResponse,
        commentPosted: state.commentPosted,
        commentsPost: state.commentsPost,
        comment: state.comment,
        commentStatus: state.commentStatus,
        childComment: state.childComment,
        childCommentStatus: state.childCommentStatus,
        fetchPost,
        patchPost,
        fetchComments,
        createAComment,
        fetchComment,
        fetchChildComments
      }}
    >
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => useContext(FetcherContext)
