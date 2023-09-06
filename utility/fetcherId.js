async function fetcherId (endpoint, id, authorization) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + id)

    const headers = new Headers()

    if (authorization) {
      const token = window.localStorage.getItem('token')
      headers.append('Authorization', `Bearer ${token}`)
    }

    const res = await fetch(url, {
      cache: 'no-store',
      headers
    })

    const statusCode = res.status

    if (!res.ok) return { data: await res.text(), status: statusCode }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default fetcherId
