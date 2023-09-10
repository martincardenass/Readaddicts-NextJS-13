async function sendMessage (receiver, content) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Message/message/send/' + receiver)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: content
    })

    if (res.status === 204) return { data: null, status: 204 }

    if (!res.ok) return { data: await res.json(), status: res.status }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default sendMessage
