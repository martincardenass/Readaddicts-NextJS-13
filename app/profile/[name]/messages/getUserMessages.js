import fetcherId from '@/utility/fetcherId'

const getUserMessages = (userId) => fetcherId('Message/messages', userId, true)

export default getUserMessages
