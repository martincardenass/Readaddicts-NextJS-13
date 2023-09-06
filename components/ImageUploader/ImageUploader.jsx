import styles from './imageutility.module.css'
import Image from 'next/image'

const ImageUtility = ({ inputRef, imageBlob, text }) => {
  const handleInputClick = () => {
    inputRef.current.click()
  }

  return (
    <aside className={styles.imagecontainer}>
      <div className={styles.image} onClick={handleInputClick}>
        {imageBlob
          ? (
            <div className={styles.imagecontainer}>
              <Image
                src={imageBlob}
                alt='Uploaded image'
                width={225}
                height={225}
              />
              <span className={styles.imagetext}>{text}</span>
            </div>
            )
          : (
            <span>Upload picture</span>
            )}
      </div>
    </aside>
  )
}

export default ImageUtility
