'use client'
import styles from './deletegroup.module.css'
import { useFetcher } from '@/hooks/useFetcher'
import Button from '@/components/Button/Button'
import { useState } from 'react'
import deleteGroup from './deleteGroup'
import { useRouter } from 'next/navigation'

const DeleteGroupPage = () => {
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState({
    status: null,
    color: 'red'
  })

  const { group, updateGroupChanged } = useFetcher()
  const router = useRouter()

  const handleInputBlur = (e) => {
    const dataFromInput = e.target.value

    if (dataFromInput === group?.data?.group_Name) {
      updateGroupChanged(true)
      setTimeout(() => {
        updateGroupChanged(false)
      }, 2000)
      setOk(true)
      setValidation({
        status: true,
        color: '#73ff83'
      })
    } else {
      setOk(false)
      setValidation({
        status: false,
        color: 'red'
      })
    }
  }

  const handleGroupDelete = async () => {
    if (ok) {
      try {
        setLoading(true)
        const del = await deleteGroup(group?.data?.group_Id)

        if (del.status === 200) {
          router.push('/groups')
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className={styles.delete}>
      <h4>
        To delete this group, type <span>{group?.data?.group_Name}</span>
      </h4>
      <div className={styles.field}>
        <input
          type='text'
          placeholder={group?.data?.group_Name}
          style={{ border: `2px solid ${validation.color}` }}
          onBlur={handleInputBlur}
        />
        <h2
          style={{
            visibility: validation.status === null ? 'hidden' : 'visible',
            color: validation.status ? '#73ff83' : 'red',
            userSelect: 'none',
            width: '5px'
          }}
        >
          {validation.status ? '✓' : '!'}
        </h2>
      </div>
      <div className={styles.buttons} onClick={handleGroupDelete}>
        <Button
          text='Delete'
          backgroundColor={ok ? 'red' : 'gray'}
          textColor='white'
          loading={loading}
        />
        <Button
          text='Cancel'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          loading={loading}
        />
      </div>
    </section>
  )
}

export default DeleteGroupPage
