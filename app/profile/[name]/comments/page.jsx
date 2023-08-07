import dynamic from 'next/dynamic'

const DynamicListOfComments = dynamic(() => import('./ListOfComents'), {
  loading: () => <h1>Loading...</h1>
})
const CommentsPage = ({ params }) => {
  const { name } = params
  return <DynamicListOfComments name={name} />
}

export default CommentsPage
