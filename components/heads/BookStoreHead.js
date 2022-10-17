import React from "react";
import Head from 'next/head';

function BookStoreHead() {

    return (
        <Head>
            <title>Bookstore</title>
            <meta name="description" content="A web ePub reader" />
            <link rel="icon" href="/favicon.ico" />

            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            <meta name="referrer" content="no-referrer" />

            <meta property="og:url" content="https://bookstore-gamma.vercel.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Bookstore" />
            <meta property="og:description" content="web ePub reader." />
            <meta property="og:image" content="/images/bookstore.jpg" />

            <meta name="twitter:card" content="summary" />
            <meta property="twitter:domain" content="bookstore-gamma.vercel.app/" />
            <meta property="twitter:url" content="https://bookstore-gamma.vercel.app/" />
            <meta name="twitter:title" content="Bookstore" />
            <meta name="twitter:description" content="web ePub reader." />
            <meta name="twitter:image" content="https://bookstore-gamma.vercel.app/images/bookstore.jpg" />

            <link rel="manifest" href="/manifest.json" />
        </Head>
    )

}

export default BookStoreHead;