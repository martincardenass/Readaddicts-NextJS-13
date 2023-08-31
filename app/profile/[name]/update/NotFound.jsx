import styles from './updateprofile.module.css'

const NotFound = ({ status }) => {
  return (
    <section className={styles.badhttpstatuscode}>
      <h1>{status} Not Found</h1>
    </section>
  )
}

export default NotFound
