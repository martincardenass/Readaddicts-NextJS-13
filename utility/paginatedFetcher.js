async function fetchPaginatedPosts (page, pageSize, urlArgs) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + urlArgs)

    url.searchParams.set('page', page)
    url.searchParams.set('pageSize', pageSize)

    const res = await fetch(url, { cache: 'no-cache' })

    if (!res.ok) {
      return { data: await res.text(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default fetchPaginatedPosts
