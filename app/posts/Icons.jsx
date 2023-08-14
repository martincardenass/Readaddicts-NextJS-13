import styles from './posts.module.css'
import dynamic from 'next/dynamic'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))

const Icons = ({ id, commentCount }) => {
  return (
    <div className={styles.commenticon}>
      <DynamicButton
        text={
          commentCount > 0 ? `${commentCount} comments` : 'No comments yet'
        }
        href={`/posts/${id}/comments`}
        width={commentCount > 0 ? '125px' : '150px'}
      />
    </div>
  )
}

export default Icons
