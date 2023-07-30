async function patchProfile (formData) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'User/update')
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: formData
    })

    const statusCode = res.status

    if (!res.ok) {
      return { data: await res.text(), status: statusCode }
    }

    return { data: await res.text(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default patchProfile
