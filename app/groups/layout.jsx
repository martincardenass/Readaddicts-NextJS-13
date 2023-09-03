import dynamic from 'next/dynamic'
import Header from './Header'
import styles from './group.module.css'

const DynamicGroups = dynamic(() => import('./Groups'), {
  loading: () => <h1>Loading groups...</h1>
})

const GroupsLayout = ({ children }) => {
  return (
    <>
      {children}
      <span className={styles.groupsheader}>
        <Header />
      </span>
      <section className={styles.groups}>
        <DynamicGroups />
      </section>
    </>
  )
}

export default GroupsLayout
