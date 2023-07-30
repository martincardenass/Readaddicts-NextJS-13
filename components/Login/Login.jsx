'use client'
import styles from './users.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {
  const { handleLogin, msg } = useAuth()
  const fields = { username: '', password: '' }

  return (
    <main className={styles.usersmain}>
      <h1>Welcome to Social Stuff</h1>
      <p>
        Dont have an account?{' '}
        <Link href='register'>
          <span className={styles.register}>Register</span>
        </Link>
      </p>
      <form className={styles.form} onSubmit={handleLogin}>
        <section className={styles.formfield}>
          <p>Username:</p>
          <input
            type='text'
            name='username'
            placeholder='Username'
            defaultValue={fields.username}
            required
          />
        </section>
        <section className={styles.formfield}>
          <p>Password:</p>
          <input
            type='password'
            name='password'
            placeholder='Password'
            defaultValue={fields.password}
            required
          />
        </section>
        <input type='submit' value='Login' />
        {msg && (
          <section className={styles.errormessage}>
            <p>{msg}</p>
          </section>
        )}
      </form>
    </main>
  )
}

export default Login
