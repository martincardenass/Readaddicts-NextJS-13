'use client'
import { useFetcher } from '@/hooks/useFetcher'
import styles from './post.module.css'
import dynamic from 'next/dynamic'

const DynamicLoadComments = dynamic(() => import('./LoadComments'))
const DynamicAddComment = dynamic(() => import('./comments/AddComent'))
const DynamicOptions = dynamic(() => import('./Options'))
const DynamicComments = dynamic(() => import('./CommentsChild'))
const DynamicDeletePost = dynamic(() => import('./DeleteChild'))
const DynamicUpdatePost = dynamic(() => import('./UpdateChild'))
const DynamicPost = dynamic(() => import('./Post'))

const Post = ({ params, children }) => {
  const { post, status } = useFetcher()
  const { id } = params

  if (status === 404) {
    return post
  }

  return (
    <main className={styles.postpage}>
      <article className={styles.postandoptions}>
        <DynamicPost id={id} />
        <DynamicOptions username={post.author} id={id} />
        {/* Childrens use onditional rendering based on the pathname */}
        <DynamicDeletePost>{children}</DynamicDeletePost>
        <DynamicUpdatePost>{children}</DynamicUpdatePost>
      </article>
      <div>
        <DynamicAddComment postId={id} placeholderText='Leave a comment' href={`/posts/${id}/comments`} />
        <DynamicLoadComments id={id} />
        <DynamicComments>{children}</DynamicComments>
      </div>
    </main>
  )
}

export default Post
