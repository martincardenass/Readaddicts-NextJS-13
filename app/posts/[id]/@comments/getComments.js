async function getComments (postId) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Comment/' + postId)

    const res = await fetch(url, { cache: 'no-store' })

    if (res.status === 204) return { data: null, status: 204 }

    if (!res.ok) {
      return { data: await res.text(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default getComments
