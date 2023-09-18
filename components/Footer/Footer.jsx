import styles from './footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>Readaddicts</h1>
      <section className={styles.footercontainer}>
        <b>Navigation</b>
        <Link href='/'>Home</Link>
        <Link href='/users'>Readers</Link>
        <Link href='/groups'>Read Groups</Link>
      </section>
      <section className={styles.footercontainer}>
        <b>Links</b>
        <Link
          href='https://github.com/ItamCrdns'
          target='_blank'
          rel='noreferrer'
        >
          GitHub (source code)
        </Link>
        <Link href=''>LinkedIn</Link>
      </section>
    </footer>
  )
}

export default Footer
