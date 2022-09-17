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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="no-referrer" />

        <meta property="og:url" content="https://bookstore-gamma.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bookstore" />
        <meta property="og:description" content="web ePub reader." />
        <meta property="og:image" content="/images/bookstore.jpg" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@flickr" />
        <meta property="twitter:domain" content="bookstore-gamma.vercel.app/" />
        <meta property="twitter:url" content="https://bookstore-gamma.vercel.app/" />
        <meta name="twitter:title" content="Bookstore" />
        <meta name="twitter:description" content="web ePub reader." />
        <meta name="twitter:image" content="https://bookstore-gamma.vercel.app/images/bookstore.jpg" />

        <link rel="manifest" href="/manifest.json" />


      </Head>
      <Script src="https://kit.fontawesome.com/c7243fd47d.js" />
      <Main />
    </div>
  )
}
