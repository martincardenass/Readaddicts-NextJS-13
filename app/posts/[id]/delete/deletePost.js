async function deletePost (postId) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Post/delete/' + postId)

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })

    const statusCode = res.status

    if (!res.ok) {
      return { data: await res.json(), status: statusCode }
    }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default deletePost
