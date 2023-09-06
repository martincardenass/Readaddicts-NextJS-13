import dynamic from 'next/dynamic'

const DynamicGroup = dynamic(() => import('./Group'), {
  loading: () => (
    <h1 style={{ textAlign: 'center', fontWeight: 400 }}>Loading...</h1>
  )
})

const GroupLayout = (props) => {
  const { groupId } = props.params

  return (
    <DynamicGroup groupId={groupId} posts={props.posts} deletePost={props.delete} manage={props.manage} />
  )
}

export default GroupLayout
