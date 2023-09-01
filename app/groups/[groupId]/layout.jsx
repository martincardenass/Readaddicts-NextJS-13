import dynamic from 'next/dynamic'

const DynamicGroup = dynamic(() => import('./Group'), {
  loading: () => <h1>Loading...</h1>
})

const GroupLayout = async ({ params, children }) => {
  const { groupId } = params

  return (
    <>
      {children}
      <DynamicGroup groupId={groupId} />
    </>
  )
}

export default GroupLayout
