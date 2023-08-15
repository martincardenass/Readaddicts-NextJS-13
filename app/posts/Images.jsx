import Image from 'next/image'
import Link from 'next/link'
import styles from './posts.module.css'

const Images = ({ images, href }) => {
  return (
    <section className={styles.images}>
      <ul>
        {images.map((image) => (
          <li key={image.image_Id}>
            <Link href={href}>
              <Image
                src={image.image_Url}
                alt={image.image_Id}
                width={100}
                height={100}
                quality={25}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Images
