import fetcherId from '@/utility/fetcherId'

const getPost = (id) => fetcherId('Post', id, true)

export default getPost
