'use client'
import { useState } from 'react'
import styles from './creategroup.module.css'
import { useRouter } from 'next/navigation'
import CreateGroup from '../CreateGroup'

const CreateGroupM = () => {
  const [close, setClose] = useState(false)

  const router = useRouter()

  const handleModalClose = () => {
    setClose(true)

    setTimeout(() => {
      router.push('/groups')
    }, 250)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      handleModalClose()
    }
  }

  return (
    <section
      tabIndex={0}
      onKeyDown={(event) => handleKeyPress(event)}
      className={styles.modalcontainer}
    >
      <span onClick={handleModalClose} className={styles.close} />
      <section
        className={`${styles.modal} ${
          close ? styles.slideouttop : styles.slideintop
        }`}
      >
        <CreateGroup />
      </section>
    </section>
  )
}

export default CreateGroupM
