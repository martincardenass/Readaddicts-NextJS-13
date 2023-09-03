import styles from './post.module.css'
import dynamic from 'next/dynamic'
import Options from './Options'
import AddComent from './@comments/AddComent'

const DynamicImages = dynamic(() => import('./ImagesChild'))
const DynamicPost = dynamic(() => import('./Post'))

const Post = (props) => {
  const { id } = props.params

  return (
    <main className={styles.postpage}>
      <DynamicImages>{props.children}</DynamicImages>
      <article className={styles.postandoptions}>
        <DynamicPost id={id} />
        <Options id={id} update={props.update} remove={props.delete} />
      </article>
      <article className={styles.comment}>
        <AddComent
          postId={id}
          placeholderText='Leave a comment...'
        />
        {props.comments}
      </article>
    </main>
  )
}

export default Post
