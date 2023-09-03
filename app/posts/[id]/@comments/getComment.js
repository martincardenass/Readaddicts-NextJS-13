// ! This gets all the comments. Might need to modify this to only get parent comments since I created a way to get the child comments separately
async function getComment (commentId) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Comment/id/' + commentId)

    const res = await fetch(url, { cache: 'no-store' })
    const statusCode = res.status

    if (!res.ok) {
      return { data: await res.json(), status: statusCode }
    }

    return { data: await res.json(), status: statusCode }
  } catch (error) {
    return error.message
  }
}

export default getComment
