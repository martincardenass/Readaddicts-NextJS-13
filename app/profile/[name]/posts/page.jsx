import dynamic from 'next/dynamic'

const DynamicListOfPosts = dynamic(() => import('./ListOfPosts'), {
  loading: () => <h1>Loading...</h1>
})

const PostsPage = ({ params }) => {
  const { name } = params
  return <DynamicListOfPosts name={name} />
}

export default PostsPage
