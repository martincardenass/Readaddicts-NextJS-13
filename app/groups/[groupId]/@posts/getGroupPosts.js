import fetcherId from '@/utility/fetcherId'

const getGroupPosts = (groupId) => fetcherId('Groups/Posts', groupId, true)

export default getGroupPosts
