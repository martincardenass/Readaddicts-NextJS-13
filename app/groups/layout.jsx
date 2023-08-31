import dynamic from 'next/dynamic'
import getGroups from './fetchGroups'

const DynamicGroups = dynamic(() => import('./Groups'), {
  loading: () => <h1>Loading groups...</h1>
})

const GroupsLayout = async ({ children }) => {
  const fetched = await getGroups()
  const groups = fetched.data

  return (
    <>
      {children}
      <DynamicGroups groups={groups} />
    </>
  )
}

export default GroupsLayout
