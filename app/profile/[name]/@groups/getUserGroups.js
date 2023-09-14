async function getUserGroups (username) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/' + username + '/groups')

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) return { data: await res.json(), status: res.status }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default getUserGroups
