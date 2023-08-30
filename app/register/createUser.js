async function createUser (creds) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/signup')
    const res = await fetch(url, {
      method: 'POST',
      body: creds
    })

    const statusCode = res.status

    if (!res.ok) {
      return { text: await res.json(), status: statusCode }
    }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default createUser
