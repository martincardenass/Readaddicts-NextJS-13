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

    if (!res.ok) {
      return { data: await res.text(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default authenticate
