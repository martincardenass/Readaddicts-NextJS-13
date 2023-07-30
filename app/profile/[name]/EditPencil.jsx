'use client'
import Link from 'next/link'
import styles from './user.module.css'
import { useAuth } from '@/hooks/useAuth'

const EditPencil = ({ name, pencil }) => {
  const { user } = useAuth()

  // * Making sure the pencil only renders for the logged in user
  if (user?.username === name) {
    return (
      <span className={styles.pencil}>
        <Link href={`/profile/${name}/update`}>
          {pencil}
        </Link>
      </span>
    )
  }
}

export default EditPencil
