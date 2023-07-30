// import Link from 'next/link'
import styles from '@/components/Login/users.module.css'

const Register = () => {
  return (
    <main className={styles.usersmain}>
      <h1>Create a new account</h1>
      <form className={styles.form}>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Username:
          </p>
          <input type='text' placeholder='Username' required />
        </section>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Email:
          </p>
          <input type='text' placeholder='Email Address' required />
        </section>
        <section className={styles.formfield}>
          <p>
            <span style={{ color: 'red' }}>*</span>Password:
          </p>
          <input type='password' placeholder='Password' required />
        </section>
        <section className={styles.formfield}>
          <p>Bio:</p>
          <input type='text' placeholder='Type something about you...' />
        </section>
        <input type='submit' value='Register' />
      </form>
    </main>
  )
}

export default Register
