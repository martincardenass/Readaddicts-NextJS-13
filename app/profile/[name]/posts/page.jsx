import dynamic from 'next/dynamic'
import styles from './listofposts.module.css'

const DynamicListOfPosts = dynamic(() => import('./ListOfPosts'), {
  loading: () => <h1>Loading...</h1>
})

const PostsPage = () => {
  return (
    <main className={styles.main}>
      <h1>Posts</h1>
      <DynamicListOfPosts />
    </main>
  )
}

export default PostsPage
