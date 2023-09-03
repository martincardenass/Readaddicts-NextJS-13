async function updatePost (postId, content) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Post/update/' + postId)
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: content
    })

    const statusCode = res.status

    if (!res.ok) {
      return { text: await res.json(), status: statusCode }
    }

    return { data: await res.text(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default updatePost
