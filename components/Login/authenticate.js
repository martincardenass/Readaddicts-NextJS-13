async function authenticate (user, pw) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/login')
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user,
        password: pw
      })
    })

    const response = await res.text() // * Return the token if successful
    const statusCode = res.status // * Return the status code

    if (!res.ok) { // * Return error message and status code
      return { text: response, status: statusCode }
    }

    return { text: response, status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default authenticate
