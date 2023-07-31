import dynamic from 'next/dynamic'
import styles from '../posts/listofposts.module.css'

const DynamicListOfComments = dynamic(() => import('./ListOfComents'), {
  loading: () => <h1>Loading...</h1>
})
const CommentsPage = ({ params }) => {
  const { name } = params
  return (
    <main className={styles.main}>
      <h1>Comments</h1>
      <DynamicListOfComments name={name} />
    </main>
  )
}

export default CommentsPage
