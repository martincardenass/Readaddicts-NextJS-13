import styles from './alert.module.css'

const Alert = ({ message }) => {
  return (
    <section className={styles.customalert}>
      <div>{message}</div>
    </section>
  )
}

export default Alert
