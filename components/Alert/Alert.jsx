import styles from './alert.module.css'

// * props with default values if not provided
const Alert = ({
  message,
  width = '125px',
  color = 'black',
  backgroundColor = 'white',
  boxShadow = `0px 0px 15px 0px ${backgroundColor}`,
  ready, // * bool. set tiemout back to false to define the duration of the alert. state initial value should be null to avoid slideOut animation on initial render
  loading = null // * for promises
}) => {
  if (loading) {
    return (
      <section
        style={{ width, backgroundColor, boxShadow, color }}
        className={`${styles.customalert} ${
          loading ? styles.slideIn : styles.slideOut
        }`}
      >
        <div className={styles.ldsring}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>
    )
  }

  if (ready !== null) {
    return (
      <section
        style={{ width, backgroundColor, boxShadow, color }}
        className={`${styles.customalert} ${
          ready === true ? styles.slideIn : ready === false ? styles.slideOut : ''
        }`}
      >
        <span>{message}</span>
      </section>
    )
  }
}

export default Alert
