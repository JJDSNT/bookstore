import React from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';

function BookHead({name, coverid}) {

    const { asPath } = useRouter();

    const webpagetile = `BookStore - ${name}`;
    const origin = 'https://bookstore-gamma.vercel.app';
    const fullPath = `${origin}${asPath}`;
    let img = `https://libgen.rs/covers/${coverid}`;

    return (

        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            <meta name="referrer" content="no-referrer" />

            <title>{webpagetile}</title>
            <meta name="description" content={name} />
            <link rel="icon" href="/favicon.ico" />

            <meta property="og:url" content={fullPath} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Bookstore" />
            <meta property="og:description" content={name} />
            <meta property="og:image" itemprop="image" content={img} key="ogimage" />

            <meta name="twitter:card" content="summary" />
            <meta property="twitter:domain" content="bookstore-gamma.vercel.app/" />
            <meta property="twitter:url" content={fullPath} />
            <meta name="twitter:title" content="Bookstore" />
            <meta name="twitter:description" content={name} key="desc" />
            <meta name="twitter:image" content={img} />
        </Head>
    )

}

export default BookHead;