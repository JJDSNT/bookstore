import Head from 'next/head';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactReader, ReactReaderStyle } from "react-reader";
import BookHead from '../../components/heads/BookHead';

//href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}

const BookReaderPage = ({ name, cid, coverid }) => {

    const ownStyles = {
        ...ReactReaderStyle,
        readerArea: {
          ...ReactReaderStyle.readerArea,
          backgroundColor: '#fff'
        }
      }

    const router = useRouter();
    let url = `https://ipfs.io/ipfs/${cid}?filename=Book.epub`;
    
    // And your own state logic to persist state
    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }

    return (
        <>
        <BookHead name={name} coverid={coverid} />
            <div style={{ height: "100vh" }}>
                <ReactReader
                    url={url}
                    swipeable={true}
                    location={location}
                    locationChanged={locationChanged}
                    styles={ownStyles}
                />
                <div style={{ float: "right" }}>
                    <Link href="/">Back to home</Link>
                </div>
            </div>
        </>
    )
}

BookReaderPage.getInitialProps = async (ctx) => {
    return { name: ctx.query.name, cid: ctx.query.cid, coverid: ctx.query.coverid }
}

export default BookReaderPage;