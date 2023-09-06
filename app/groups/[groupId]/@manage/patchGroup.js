import patcher from '@/utility/patcher'

const patchGroup = (content, groupId) => patcher('Groups/Update', content, groupId)

export default patchGroup
