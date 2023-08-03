import styles from './posts.module.css'
import dynamic from 'next/dynamic'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const Icons = ({ id }) => {
  return (
    <div className={styles.commenticon}>
      <DynamicButton text='Comments' href={`/posts/${id}/comments`} />
    </div>
  )
}

export default Icons
