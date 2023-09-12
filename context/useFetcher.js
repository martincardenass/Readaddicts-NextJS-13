'use client'
import { createContext, useContext, useReducer } from 'react'
import getPost from '@/app/posts/[id]/getPost'
import getGroup from '@/app/groups/[groupId]/fetchGroup'
import getGroups from '@/app/groups/fetchGroups'
import getGroupPosts from '@/app/groups/[groupId]/@posts/getGroupPosts'
import updatePost from '@/app/posts/[id]/@update/updatePost'
import getComments from '@/app/posts/[id]/@comments/getComments'
import getComment from '@/app/posts/[id]/@comments/getComment'
import groupJoinLeave from '@/app/groups/[groupId]/groupLeaverAndJoiner'

const FetcherContext = createContext(null)

const initialState = {
  // * Posts
  post: {},
  groupPosts: {},
  patchPostStatus: null,
  msg: {
    text: null,
    status: null,
    backgroundColor: null,
    color: null,
    width: null
  },
  changed: false,

  // * Comments
  comments: {},
  comment: null,

  // * Groups
  group: {},
  groups: {},
  groupChanged: false,
  groupLoading: false
}

const ACTIONS = {
  FETCH_POST: 'FETCH_POST',
  FETCH_GROUP_POSTS: 'FETCH_GROUP_POSTS',
  PATCH_POST: 'PATCH_POST',
  ALTER_CHANGE: 'ALTER_CHANGE',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  FETCH_COMMENT: 'FETCH_COMMENT',
  UPDATE_GROUP_CHANGED: 'UPDATE_GROUP_CHANGED',
  UPDATE_MESSAGES_CHANGED: 'UPDATE_MESSAGES_CHANGED',
  UPDATE_POST_CHANGED: 'UPDATE_POST_CHANGED',
  FETCH_GROUP: 'FETCH_GROUP',
  FETCH_GROUPS: 'FETCH_GROUPS',
  ALTER_GROUP_LOADING: 'ALTER_GROUP_LOADING',
  ALERT_GROUP_CHANGED: 'ALERT_GROUP_CHANGED',
  GROUP_JOIN_LEAVE_STUFF: 'GROUP_JOIN_LEAVE_STUFF',
  FETCH_USERS_CONVERSATION: 'FETCH_USERS_CONVERSATION'
}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case ACTIONS.FETCH_POST: {
      return {
        ...state,
        post: actionPayload
      }
    }

    case ACTIONS.FETCH_GROUP_POSTS: {
      return {
        ...state,
        groupPosts: actionPayload
      }
    }

    case ACTIONS.FETCH_USERS_CONVERSATION: {
      return {
        ...state,
        messages: {
          ...state.messages,
          data: [...actionPayload?.data, ...state.messages.data],
          status: actionPayload?.status
        },
        messagesPage: state.messagesPage + 1,
        initialMessageFetch: true
      }
    }

    case ACTIONS.UPDATE_MESSAGES_CHANGED: {
      return {
        ...state,
        messagesChanged: actionPayload
      }
    }

    case ACTIONS.PATCH_POST: {
      const data = actionPayload

      if (data.status === 200) {
        return {
          ...state,
          msg: {
            text: 'Post updated successfully',
            status: true,
            backgroundColor: 'rgb(0, 210, 255)',
            color: 'white',
            width: '215px'
          },
          changed: true,
          patchPostStatus: actionPayload.status
        }
      }

      if (data.status === 400) {
        return {
          ...state,
          msg: {
            text: 'Something went wrong',
            status: true,
            backgroundColor: 'red',
            color: 'white',
            width: '185px'
          }
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
          msg: {
            text: 'Your session has expired. You may login again.',
            status: true,
            backgroundColor: 'red',
            color: 'white',
            width: '350px'
          }
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
          msg: {
            text: 'Something went wrong',
            status: true,
            backgroundColor: 'red',
            color: 'white',
            width: '185px'
          }
        }
      }
    }

    case ACTIONS.ALTER_CHANGE: {
      return {
        ...state,
        changed: actionPayload,
        msg: {
          ...state.msg,
          status: false
        }
      }
    }

    case ACTIONS.FETCH_COMMENTS: {
      return {
        ...state,
        comments: actionPayload
      }
    }

    case ACTIONS.UPDATE_GROUP_CHANGED: {
      const data = actionPayload

      return {
        ...state,
        groupChanged: data
      }
    }

    case ACTIONS.UPDATE_POST_CHANGED: {
      return {
        ...state,
        changed: actionPayload
      }
    }

    case ACTIONS.FETCH_COMMENT: {
      return {
        ...state,
        comment: actionPayload
      }
    }

    case ACTIONS.FETCH_GROUP: {
      return {
        ...state,
        group: actionPayload
      }
    }

    case ACTIONS.FETCH_GROUPS: {
      return {
        ...state,
        groups: actionPayload
      }
    }

    case ACTIONS.ALERT_GROUP_CHANGED: {
      return {
        ...state,
        groupChanged: actionPayload
      }
    }

    case ACTIONS.GROUP_JOIN_LEAVE_STUFF: {
      const data = actionPayload

      if (data.status === 200) {
        return {
          ...state,
          groupChanged: true
        }
      } else {
        return {
          ...state,
          groupChanged: false
        }
      }
    }

    case ACTIONS.ALTER_GROUP_LOADING: {
      return {
        ...state,
        groupLoading: actionPayload
      }
    }
  }
  return state
}

export const Fetcher = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // * Posts
  const fetchPost = async (id) => {
    const data = await getPost(id)
    dispatch({ type: ACTIONS.FETCH_POST, payload: data })
  }

  const fetchGroupPosts = async (groupId) => {
    const data = await getGroupPosts(groupId)
    dispatch({ type: ACTIONS.FETCH_GROUP_POSTS, payload: data })
  }

  const patchPost = async (id, content) => {
    const data = await updatePost(id, content)
    dispatch({ type: ACTIONS.PATCH_POST, payload: data })

    setTimeout(() => {
      dispatch({ type: ACTIONS.ALTER_CHANGE, payload: false })
    }, 3000)
  }

  const updatePostChanged = (status) => {
    dispatch({ type: ACTIONS.UPDATE_POST_CHANGED, payload: status })
  }

  // * Comments
  const fetchComments = async (postId) => {
    const data = await getComments(postId)
    dispatch({ type: ACTIONS.FETCH_COMMENTS, payload: data })
  }

  const fetchComment = async (commentId) => {
    const data = await getComment(commentId)
    dispatch({ type: ACTIONS.FETCH_COMMENT, payload: data })
  }

  // * Groups
  const fetchGroupById = async (groupId) => {
    const data = await getGroup(groupId)
    dispatch({ type: ACTIONS.FETCH_GROUP, payload: data })
  }

  const fetchAllGroups = async () => {
    const data = await getGroups()
    dispatch({ type: ACTIONS.FETCH_GROUPS, payload: data })
  }

  const joinGroup = async (groupId) => {
    try {
      dispatch({ type: ACTIONS.ALTER_GROUP_LOADING, payload: true })
      const join = await groupJoinLeave(groupId, 'POST')
      dispatch({ type: ACTIONS.GROUP_JOIN_LEAVE_STUFF, payload: join })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: ACTIONS.ALTER_GROUP_LOADING, payload: false })
      setTimeout(() => {
        dispatch({ type: ACTIONS.ALERT_GROUP_CHANGED, payload: false })
      }, 1000)
    }
  }

  const leaveGroup = async (groupId) => {
    try {
      dispatch({ type: ACTIONS.ALTER_GROUP_LOADING, payload: true })
      const leave = await groupJoinLeave(groupId, 'DELETE')
      dispatch({ type: ACTIONS.GROUP_JOIN_LEAVE_STUFF, payload: leave })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: ACTIONS.ALTER_GROUP_LOADING, payload: false })
      setTimeout(() => {
        dispatch({ type: ACTIONS.ALERT_GROUP_CHANGED, payload: false })
      }, 1000)
    }
  }

  const updateGroupChanged = (status, timeout) => {
    dispatch({ type: ACTIONS.UPDATE_GROUP_CHANGED, payload: status })

    setTimeout(() => {
      dispatch({ type: ACTIONS.UPDATE_GROUP_CHANGED, payload: !status })
    }, timeout)
  }

  return (
    <FetcherContext.Provider
      value={{
        post: state.post,
        groupPosts: state.groupPosts,
        patchPostStatus: state.patchPostStatus,
        msg: state.msg,
        changed: state.changed,
        comments: state.comments,
        comment: state.comment,
        group: state.group,
        groups: state.groups,
        groupChanged: state.groupChanged,
        groupLoading: state.groupLoading,
        fetchPost,
        fetchGroupById,
        fetchGroupPosts,
        fetchAllGroups,
        patchPost,
        fetchComments,
        fetchComment,
        updateGroupChanged,
        updatePostChanged,
        joinGroup,
        leaveGroup
      }}
    >
      {children}
    </FetcherContext.Provider>
  )
}

export const useFetcher = () => useContext(FetcherContext)
