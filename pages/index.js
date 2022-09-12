import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Main from "../components/Main";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bookstore</title>
        <meta name="description" content="A web ePub reader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </div>
  )
}
