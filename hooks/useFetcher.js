'use client'
import { createContext, useContext, useReducer } from 'react'
import getPost from '@/app/posts/[id]/getPost'
import getGroup from '@/app/groups/[groupId]/fetchGroup'
import groupJoinLeave from '@/app/groups/[groupId]/groupLeaverAndJoiner'
import updatePost from '@/app/posts/[id]/edit/updatePost'
import getComments from '@/app/posts/[id]/comments/getComments'
import getComment from '@/app/posts/[id]/comments/getComment'
import errorTextReplace from '@/utility/errorTextReplace'

const FetcherContext = createContext(null)

const initialState = {
  // * Posts
  post: {},
  status: null,
  patchPostStatus: null,
  msg: null,
  changed: false,

  // * Comments
  comments: {},
  commentsStatus: null,
  commentPosted: false,
  comment: null,
  commentStatus: null,

  // * Groups
  group: {},
  groupStatus: null,
  groupChanged: false,
  groupLoading: false
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
        comments: actionPayload.data,
        commentsStatus: actionPayload.status
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
        comment: actionPayload.data,
        commentStatus: actionPayload.status
      }
    }

    case 'FETCH_GROUP': {
      return {
        ...state,
        group: actionPayload.data,
        groupStatus: actionPayload.status
      }
    }

    case 'SET_GROUP_CHANGED_FALSE': {
      return {
        ...state,
        groupChanged: false
      }
    }

    case 'JOIN_GROUP': {
      const data = actionPayload
      if (data.status === 200) {
        return {
          ...state,
          groupChanged: true
        }
      } else {
        return {
          ...state
        }
      }
    }

    case 'LEAVE_GROUP': {
      const data = actionPayload
      if (data.status === 200) {
        return {
          ...state,
          groupChanged: true
        }
      } else {
        return {
          ...state
        }
      }
    }

    case 'SET_GROUP_LOADING_TRUE': {
      return {
        ...state,
        groupLoading: true
      }
    }

    case 'SET_GROUP_LOADING_FALSE': {
      return {
        ...state,
        groupLoading: false
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

  const handleJoinGroup = async (groupId) => {
    try {
      dispatch({ type: 'SET_GROUP_LOADING_TRUE' })

      const data = await groupJoinLeave(groupId, 'POST')
      dispatch({
        type: 'JOIN_GROUP',
        payload: data
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET_GROUP_LOADING_FALSE' })
    }

    setTimeout(() => {
      dispatch({
        type: 'SET_GROUP_CHANGED_FALSE'
      })
    }, 1000)
  }

  const handleLeaveGroup = async (groupId) => {
    try {
      dispatch({ type: 'SET_GROUP_LOADING_TRUE' })

      const data = await groupJoinLeave(groupId, 'DELETE')
      dispatch({
        type: 'LEAVE_GROUP',
        payload: data
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET_GROUP_LOADING_FALSE' })
    }

    setTimeout(() => {
      dispatch({
        type: 'SET_GROUP_CHANGED_FALSE'
      })
    }, 1000)
  }

  return (
    <FetcherContext.Provider
      value={{
        post: state.post,
        status: state.status,
        patchPostStatus: state.patchPostStatus,
        msg: state.msg,
        changed: state.changed,
        comments: state.comments,
        commentsStatus: state.commentsStatus,
        commentPosted: state.commentPosted,
        comment: state.comment,
        commentStatus: state.commentStatus,
        group: state.group,
        groupStatus: state.groupStatus,
        groupChanged: state.groupChanged,
        groupLoading: state.groupLoading,
        fetchPost,
        fetchGroupById,
        patchPost,
        fetchComments,
        fetchComment,
        updateCommentPostedResponse,
        handleJoinGroup,
        handleLeaveGroup
      }}
    >
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => useContext(FetcherContext)
