import getUsers from './getUsers'
import UsersAndTiers from './Users'

const Users = async ({ searchParams }) => {
  const userTierCollection = await getUsers()
  const users = userTierCollection?.data?.Users
  const tiers = userTierCollection?.data?.Tiers

  return (
    <UsersAndTiers users={users} tiers={tiers} searchParams={searchParams} />
  )
}

export default Users
