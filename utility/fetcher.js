// * args should be passed within an object when we call the fetcher. Ex: { Example: value }
async function fetcher (endpoint, ...args) {
  // * endpoint its a string. Ex '/User' or '/Comment/id/#'
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

    if (args) {
      // * Convert the ...args into an object
      const params = Object.assign({}, ...args)
      // * Iterate over the the args object using for in loop
      for (const key in params) {
        url.searchParams.set(key, params[key])
      }
    }

    const res = await fetch(url, { cache: 'no-store' })

    const statusCode = res.status

    if (!res.ok) return { data: await res.text(), status: statusCode }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default fetcher
