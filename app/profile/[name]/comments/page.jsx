import dynamic from 'next/dynamic'
import styles from '../posts/listofposts.module.css'

const DynamicListOfComments = dynamic(() => import('./ListOfComents'), {
  loading: () => <h1>Loading...</h1>
})
const CommentsPage = () => {
  return (
    <main className={styles.main}>
      <h1>Comments</h1>
      <DynamicListOfComments />
    </main>
  )
}

export default CommentsPage
