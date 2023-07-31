import styles from './newpost.module.css'
import Image from 'next/image'

const NewPostPage = ({ user, handlePost, posted }) => {
  if (posted) {
    return (
      <main className={styles.newpostdenied}>
        <section className={styles.newpostcontainer}>
          <Image className={styles.postedimage} src={user.profile_Picture} alt={user.username} width={75} height={75} />
          <div className={styles.flexor}>
            <form className={styles.postedinput} onSubmit={handlePost}>
              <input type='text' name='content' placeholder={` Say something, ${user.username}`} disabled />
              <input type='submit' value='Send' disabled />
            </form>
          </div>
        </section>
      </main>
    )
  }

  if (!posted) {
    return (
      <main className={styles.newpost}>
        <section className={styles.newpostcontainer}>
          <Image src={user.profile_Picture} alt={user.username} width={75} height={75} />
          <form onSubmit={handlePost}>
            <input type='text' name='content' placeholder={` Say something, ${user.username}`} required />
            <input type='submit' value='Send' />
          </form>
        </section>
      </main>
    )
  }
}

export default NewPostPage
