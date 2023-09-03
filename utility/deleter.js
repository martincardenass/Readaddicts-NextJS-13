async function deleter (endpoint, id) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + '/' + id)

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })

    if (!res.ok) return { data: await res.json(), status: res.status }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default deleter
