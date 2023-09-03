'use client'
import TopModal from './TopModal'
import styles from './groupPosts.module.css'

const GroupPostsPage = (props) => {
  return (
    <section className={styles.groupposts}>
      <TopModal />
      {props.groupPosts}
    </section>
  )
}

export default GroupPostsPage
