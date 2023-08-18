'use client'
import styles from './images.module.css'
import { useFetcher } from '@/hooks/useFetcher'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const ImageIdPage = ({ params }) => {
  const { post } = useFetcher()
  const { imageId } = params
  const router = useRouter()
  const pathname = usePathname()

  const image = post?.images?.find(
    (image) => image.image_Id === parseInt(imageId)
  )

  if (image) {
    return (
      <section className={styles.image}>
        <Link href={`/posts/${post.post_Id}`} className={styles.close} />
        <div className={styles.imagecontainer}>
          <Image
            src={image?.image_Url}
            alt={image?.image_Id}
            width={500}
            height={500}
            quality={100}
            style={{ maxWidth: '100%', height: '100%' }}
          />
        </div>
        <section className={styles.images}>
          {post?.images?.map((image) => (
            <Image
              key={image.image_Id}
              src={image.image_Url}
              alt={image.image_Id}
              width={150}
              height={2}
              style={{
                maxWidth: '100%',
                height: '100%',
                cursor: 'pointer',
                opacity: pathname.includes(`${image.image_Id}`) ? '1' : '.5'
              }}
              onClick={() =>
                router.push(`/posts/${post.post_Id}/image/${image.image_Id}`)}
            />
          ))}
        </section>
      </section>
    )
  }
}

export default ImageIdPage
