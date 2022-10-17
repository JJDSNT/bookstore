import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Main from "../components/Main";
import BookStoreHead from '../components/heads/BookStoreHead';


export default function Home() {
  return (
    <div id="app" className={styles.container}>
      <BookStoreHead />
      <Script src="https://kit.fontawesome.com/c7243fd47d.js" />
      <Main />
    </div>
  )
}
