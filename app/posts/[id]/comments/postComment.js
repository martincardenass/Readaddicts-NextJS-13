async function createComment (postId, content) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Comment/post/' + postId)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({ content })
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

export default createComment
