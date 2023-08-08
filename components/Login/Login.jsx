'use client'
import styles from './users.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import Button from '../Button/Button'
import { useRef } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '../Alert/Alert'

const Login = () => {
  const { handleLogin, msg } = useAuth()
  const fields = { username: '', password: '' }
  const formRef = useRef()

  const handleSubmit = useSubmitRef(formRef)

  return (
    <main className={styles.usersmain}>
      <h1>Welcome to Social Stuff</h1>
      <p>
        Dont have an account?{' '}
        <Link href='register'>
          <span className={styles.register}>Register</span>
        </Link>
      </p>
      <form ref={formRef} className={styles.form} onSubmit={handleLogin}>
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
      </form>
      <div onClick={handleSubmit}>
        <Button text='Login' backgroundColor='#ed2085' textColor='white' />
      </div>
      {msg && <Alert message={msg} width={msg === 'Wrong password' ? '150px' : '225px'} />}
    </main>
  )
}

export default Login
