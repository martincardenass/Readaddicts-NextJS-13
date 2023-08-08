'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import styles from './comments.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useSubmitRef } from '@/utility/formSubmitRef'
import { useFetcher } from '@/hooks/useFetcher'
import { usePathname, useRouter } from 'next/navigation'

const DynamicButton = dynamic(() => import('@/components/Button/Button'))
const DynamicAlert = dynamic(() => import('@/components/Alert/Alert'))

const AddComent = ({ postId }) => {
  const {
    createAComment,
    commentPosted,
    commentPostedResponse,
    commentsStatus
  } = useFetcher()
  const { user } = useAuth()
  const formRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  const handleSubmit = useSubmitRef(formRef)

  const postComment = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    // * Only make a request if content is sent
    if (formData.content !== '') {
      createAComment(postId, formData.content)
      if (!pathname.includes('/comments')) {
        router.push(`${postId}/comments`)
      }
    }
  }

  return (
    <>
      {commentPosted && (
        <DynamicAlert
          message={commentsStatus === 400 ? 'An error ocurred' : commentPostedResponse}
          width='150px'
        />
      )}
      <section className={styles.addcommentcontainer}>
        <section className={styles.addcomment}>
          <Image
            src={user?.profile_Picture}
            alt={user?.username}
            width={50}
            height={50}
          />
          <form ref={formRef} onSubmit={postComment}>
            <input type='text' name='content' placeholder='Write a comment' />
          </form>
          <div onClick={handleSubmit}>
            <DynamicButton
              text='Comment'
              backgroundColor='#ed2085'
              textColor='white'
            />
          </div>
        </section>
      </section>
    </>
  )
}

export default AddComent
