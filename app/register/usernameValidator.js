async function validateUsername (username) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/Validator/UsernameExists/' + username)

    const res = await fetch(url, {
      method: 'POST'
    })

    if (!res.ok) {
      return res.json()
    }

    return res.json()
  } catch (error) {
    return error.message
  }
}

export default validateUsername
