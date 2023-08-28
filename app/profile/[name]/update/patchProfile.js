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

    if (!res.ok) {
      return { data: await res.text(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default patchProfile
