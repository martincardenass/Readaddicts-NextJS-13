async function groupJoinLeave (groupId, method) {
  try {
    let endpoint
    if (method === 'POST') {
      endpoint = 'Join'
    } else if (method === 'DELETE') {
      endpoint = 'Leave'
    }

    const url = new URL(
      process.env.NEXT_PUBLIC_API_URL + 'Groups/' + endpoint + '/' + groupId
    )
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })

    if (!res.ok) {
      return { text: await res.json(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default groupJoinLeave
