import styles from './updateprofile.module.css'

const NotFound = ({ status, paramsUser }) => {
  return (
    <section className={styles.badhttpstatuscode}>
      <h1>{status} Not Found</h1>
      <h3>{paramsUser}</h3>
    </section>
  )
}

export default NotFound
