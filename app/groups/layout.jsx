import dynamic from 'next/dynamic'
import getGroups from './fetchGroups'
import Header from './Header'
import styles from './group.module.css'

const DynamicGroups = dynamic(() => import('./Groups'), {
  loading: () => <h1>Loading groups...</h1>
})

const GroupsLayout = async ({ children }) => {
  const fetched = await getGroups()
  const groups = fetched.data

  return (
    <>
      {children}
      <span className={styles.groupsheader}>
        <Header />
      </span>
      <section className={styles.groups}>
        <DynamicGroups groups={groups} />
      </section>
    </>
  )
}

export default GroupsLayout
