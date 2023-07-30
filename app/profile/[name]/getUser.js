async function getUser (username) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/username/' + username)
    const res = await fetch(url, { cache: 'no-store' })

    const statusCode = res.status // Status code either 200 or 404 for this case

    if (!res.ok) {
      return { text: await res.text(), status: statusCode }
    }
    return { text: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default getUser
