import styles from './updateprofile.module.css'
import Link from 'next/link'

const Unauthorized = () => {
  return (
    <section className={styles.badhttpstatuscode}>
      <h1>401 Unauthorized</h1>
      <span className={styles.gohome}>
        <Link href='/'>Go Home</Link>
      </span>
    </section>
  )
}

export default Unauthorized
