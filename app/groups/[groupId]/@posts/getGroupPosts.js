import fetcherId from '@/utility/fetcherId'

const getGroupPosts = (groupId) => fetcherId('Post/Group', groupId)

export default getGroupPosts
