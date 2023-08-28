import styles from './posts.module.css'
import Button from '@/components/Button/Button'

const Icons = ({ id, commentCount }) => {
  return (
    <div className={styles.commenticon}>
      <Button
        text={
          commentCount > 0 ? `${commentCount} comments` : 'No comments yet'
        }
        href={`/posts/${id}/comments`}
        width={commentCount > 0 ? '125px' : '150px'}
        effectWidth={commentCount > 0 ? '125px' : '150px'}
        effectHeight={commentCount > 0 ? '125px' : '150px'}
      />
    </div>
  )
}

export default Icons
