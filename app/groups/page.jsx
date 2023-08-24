import getGroups from './fetchGroups'

const GroupsPage = async () => {
  const posts = await getGroups()
  console.log(posts)

  return (
    <div>GroupsPage</div>
  )
}

export default GroupsPage
