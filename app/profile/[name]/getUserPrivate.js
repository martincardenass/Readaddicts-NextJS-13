// * This fetches a user along with their personal information,
// * so, only the logged in user can do this.

async function getUserPrivate (userId) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/id/' + userId)
    const res = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer' + window.localStorage.getItem('token')
        }
      },
      { cache: 'no-store' }
    )

    const statusCode = res.status

    if (!res.ok) {
      return { data: await res.text(), status: statusCode }
    }
    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default getUserPrivate
