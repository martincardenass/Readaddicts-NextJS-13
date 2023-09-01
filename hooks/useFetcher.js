'use client'
import { createContext, useContext, useReducer } from 'react'
import getPost from '@/app/posts/[id]/getPost'
import getGroup from '@/app/groups/[groupId]/fetchGroup'
import updatePost from '@/app/posts/[id]/edit/updatePost'
import getComments from '@/app/posts/[id]/comments/getComments'
import getComment from '@/app/posts/[id]/comments/getComment'
import errorTextReplace from '@/utility/errorTextReplace'

const FetcherContext = createContext(null)

const initialState = {
  // * Posts
  post: {},
  patchPostStatus: null,
  msg: null,
  changed: false,

  // * Comments
  comments: {},
  commentPosted: false,
  comment: null,

  // * Groups
  group: {},
  groupChanged: false
}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case 'FETCH_POST': {
      return {
        ...state,
        post: actionPayload
      }
    }

    case 'PATCH_POST': {
      const data = actionPayload

      if (data.status === 200) {
        return {
          ...state,
          msg: 'Post update success',
          changed: true,
          patchPostStatus: actionPayload.status
        }
      }

      if (data.status === 400) {
        const replacedErrorText = errorTextReplace(data)
        return {
          ...state,
          msg: replacedErrorText
        }
      }

      if (data.status === undefined) {
        setTimeout(() => {
          ;['token', 'user'].forEach((item) =>
            window.localStorage.removeItem(item)
          )
          window.location.reload()
        }, 2000)
        return {
          ...state,
          msg: 'Something went wrong'
        }
      } else {
        setTimeout(() => {
          ;['token', 'user'].forEach((item) =>
            window.localStorage.removeItem(item)
          )
          window.location.reload()
        }, 2000)
        return {
          ...state,
          msg: 'Something went wrong'
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
        comments: actionPayload
      }
    }

    case 'UPDATE_COMMENT_POSTED': {
      const data = actionPayload

      return {
        ...state,
        commentPosted: data
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
        comment: actionPayload
      }
    }

    case 'FETCH_GROUP': {
      return {
        ...state,
        group: actionPayload
      }
    }

    case 'SET_GROUP_CHANGED_FALSE': {
      return {
        ...state,
        groupChanged: false
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

  const updateCommentPostedResponse = (status) => {
    dispatch({ type: 'UPDATE_COMMENT_POSTED', payload: status })
  }

  // * Groups
  const fetchGroupById = async (groupId) => {
    try {
      const fetched = await getGroup(groupId)
      dispatch({
        type: 'FETCH_GROUP',
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
        patchPostStatus: state.patchPostStatus,
        msg: state.msg,
        changed: state.changed,
        comments: state.comments,
        commentPosted: state.commentPosted,
        comment: state.comment,
        group: state.group,
        groupChanged: state.groupChanged,
        fetchPost,
        fetchGroupById,
        patchPost,
        fetchComments,
        fetchComment,
        updateCommentPostedResponse
      }}
    >
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => useContext(FetcherContext)
