'use client'
import CreateGroup from '../CreateGroup'
import styles from '@/app/groups/(.)create/creategroup.module.css'

const CreateGroupPage = () => {
  return (
    <section className={styles.modalpage}>
      <CreateGroup />
    </section>
  )
}

export default CreateGroupPage
