// * This fetches a user along with their personal information,
// * so, only the logged in user can do this.

async function getUserPrivate (username) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/username/name/' + username)
    const res = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      },
      { cache: 'no-store' }
    )

    if (res.status === 401) return { data: null, status: res.status }

    if (!res.ok) {
      return { data: await res.text(), status: res.status }
    }
    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default getUserPrivate
