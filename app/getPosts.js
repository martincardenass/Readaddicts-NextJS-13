async function getPosts (page, pageSize) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Post/allposts')
    url.searchParams.set('page', page)
    url.searchParams.set('pageSize', pageSize)

    const res = await fetch(url, { cache: 'no-store' })

    const statusCode = res.status

    if (!res.ok) {
      return { data: await res.text(), status: statusCode }
    }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default getPosts
