import Head from 'next/head';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactReader } from "react-reader";

//href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}

const BookReaderPage = ({ name, cid }) => {

    const router = useRouter();
    const { asPath } = useRouter();

    const webpagetile = 'BookStore - '+name;
    //const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const origin = 'https://bookstore-gamma.vercel.app/';
    const fullPath = `${origin}${asPath}`;

    let url = `https://ipfs.io/ipfs/${cid}?filename=book.epub`;

    // useEffect(() => {
    //     if (!cid) {
    //         return;
    //     }
    //     url = `https://ipfs.io/ipfs/${cid}?filename=book.epub`;
    // }, [cid])
    //useeffect para atualizar o cid?

    //let teste = `https://ipfs.io/ipfs/bafykbzaceaatvijwreyc6yyarhkq7cpc4nnhxgvamy2xc7argn33ewztqksnq?filename=%28Oxford%20History%20of%20Modern%20Europe%29%20Paul%20W.%20Schroeder%20-%20The%20Transformation%20of%20European%20Politics%201763-1848-Oxford%20University%20Press%2C%20USA%20%281994%29.epub`;

    // And your own state logic to persist state
    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }

    return (
        <>
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
                <meta property="og:image" content="https://libgen.rs/covers/3391000/015805d053b16b1248c1b28d906b84bb-g.jpg" key="ogimage" />

                <meta name="twitter:card" content="summary" />
                <meta property="twitter:domain" content="bookstore-gamma.vercel.app/" />
                <meta property="twitter:url" content={fullPath} />
                <meta name="twitter:title" content="Bookstore" />
                <meta name="twitter:description" content={name} key="desc" />
                <meta name="twitter:image" content="https://libgen.rs/covers/3391000/015805d053b16b1248c1b28d906b84bb-g.jpg" />
            </Head>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    url={url}
                    swipeable={true}
                    location={location}
                    locationChanged={locationChanged}
                />
                <div style={{ float: "right" }}>
                    <Link href="/">Back to home</Link>
                </div>
            </div>
        </>
    )
}

BookReaderPage.getInitialProps = async (ctx) => {
    return { name: ctx.query.name, cid: ctx.query.cid }
}

export default BookReaderPage;