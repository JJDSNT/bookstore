import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Main from "../components/Main";


export default function Home() {
  return (
    <div id="app" className={styles.container}>
      <Head>
        <title>Bookstore</title>
        <meta name="description" content="A web ePub reader" />
        <link rel="icon" href="/favicon.ico" />
        <Script src="https://kit.fontawesome.com/c7243fd47d.js" />
      </Head>
      <Main />
    </div>
  )
}
