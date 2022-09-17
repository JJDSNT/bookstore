
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import Leitor from "../../components/Monocle/Leitor"


//href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}

const MonoclePage = () => {


    const router = useRouter()
    const { cid, name } = router.query



    //useeffect para atualizar o cid?

    let teste = `https://ipfs.io/ipfs/bafykbzaceaatvijwreyc6yyarhkq7cpc4nnhxgvamy2xc7argn33ewztqksnq?filename=%28Oxford%20History%20of%20Modern%20Europe%29%20Paul%20W.%20Schroeder%20-%20The%20Transformation%20of%20European%20Politics%201763-1848-Oxford%20University%20Press%2C%20USA%20%281994%29.epub`;

    //[path, setPath] = useState(path);

    useEffect(() => {
        if (!cid) {
            return;
        }
        let path = `https://ipfs.io/ipfs/${cid}?filename=teste.epub`;
        // This is some basic code for using Monocle with EFM.
        // First, we need to tell zip.js where to find its accessory files.
        if (zip ==undefined) {
            console.log("caramba");
            return;
        } else {
            zip.workerScriptsPath = "/libs/";
        }

        console.log(path);
        readUrl(path);
    }, [cid]);





    async function readUrl(url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "blob";
        request.onload = function () {
            new Epub(request.response, function (bookData) {
                Monocle.Reader("reader", bookData);
            });
        };
        request.send();
    }

    return (
        <>
            <Script src="../../libs/zip.js" strategy="beforeInteractive" />
            <Script src="../../libs/monocore.js" strategy="beforeInteractive" />
            <Script src="../../libs/monoctrl.js" strategy="beforeInteractive" />
            <Script src="../../libs/efm.js" strategy="beforeInteractive" />
            <Leitor title={name} />
        </>
    )
}

export default MonoclePage;