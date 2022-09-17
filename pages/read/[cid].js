import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactReader } from "react-reader"

//href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}

const BookReaderPage = () => {
    const router = useRouter()
    const { cid, name } = router.query
    let path ='';
    useEffect(() => {
        if (!cid) {
            return;
        }
        path = `https://ipfs.io/ipfs/${cid}?filename=teste.epub`;
    }, [cid])
    //useeffect para atualizar o cid?

    let teste = `https://ipfs.io/ipfs/bafykbzaceaatvijwreyc6yyarhkq7cpc4nnhxgvamy2xc7argn33ewztqksnq?filename=%28Oxford%20History%20of%20Modern%20Europe%29%20Paul%20W.%20Schroeder%20-%20The%20Transformation%20of%20European%20Politics%201763-1848-Oxford%20University%20Press%2C%20USA%20%281994%29.epub`;

    // And your own state logic to persist state
    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }

    return (
        <div style={{ height: "100vh" }}>

            <ReactReader
                url={path}
                swipeable={true}
                location={location}
                locationChanged={locationChanged}
            />
            <div style={{ float: "right" }}>
                <Link href="/">Back to home</Link>
            </div>
        </div>
    )
}

export default BookReaderPage;