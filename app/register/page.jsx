import styles from '@/components/Login/users.module.css'
import Button from '@/components/Button/Button'

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
        {/* <input type='submit' value='Register' /> */}
      </form>
      <Button text='Sign up' backgroundColor='#ed2085' textColor='white' effectColor='rgb(235, 235, 235)' />
    </main>
  )
}

export default Register
