'use client'
import { useEffect, useRef } from 'react'
import styles from './alert.module.css'

const Alert = ({ message, width }) => {
  const ref = useRef()

  useEffect(() => {
    const reference = ref.current

    if (width !== undefined) {
      reference.style.setProperty('--width', width)
    }
  }, [width])

  return (
    <section ref={ref} className={styles.customalert}>
      <div>{message}</div>
    </section>
  )
}

export default Alert
