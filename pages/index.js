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

        <meta name="referrer" content="no-referrer" />

        <meta property="og:url" content="https://github.com/JJDSNT/bookstore" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bookstore" />
        <meta property="og:description" content="web ePub reader." />
        <meta property="og:image" content="https://repository-images.githubusercontent.com/535483255/2dcf1529-9f36-4cb5-9bbd-156039616007" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="github.com" />
        <meta property="twitter:url" content="https://github.com/JJDSNT/bookstore" />
        <meta name="twitter:title" content="Bookstore" />
        <meta name="twitter:description" content="web ePub reader." />
        <meta name="twitter:image" content="https://repository-images.githubusercontent.com/535483255/2dcf1529-9f36-4cb5-9bbd-156039616007" />
      </Head>
      <Script src="https://kit.fontawesome.com/c7243fd47d.js" />
      <Main />
    </div>
  )
}
