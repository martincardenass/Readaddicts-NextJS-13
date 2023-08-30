async function fieldsValidator (endpoint, toValidate) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint + toValidate)

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

export default fieldsValidator
