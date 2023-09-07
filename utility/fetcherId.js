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

    if (res.status === 204) return { data: null, status: 204 }

    if (!res.ok) return { data: await res.text(), status: res.status }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default fetcherId
