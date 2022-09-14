import Script from 'next/script'
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Leitor from "../../components/Monocle/Leitor"


//href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}

const MonoclePage = () => {


    const router = useRouter()
    const { cid, name } = router.query



    //useeffect para atualizar o cid?
    
    let teste = `https://ipfs.io/ipfs/bafykbzaceaatvijwreyc6yyarhkq7cpc4nnhxgvamy2xc7argn33ewztqksnq?filename=%28Oxford%20History%20of%20Modern%20Europe%29%20Paul%20W.%20Schroeder%20-%20The%20Transformation%20of%20European%20Politics%201763-1848-Oxford%20University%20Press%2C%20USA%20%281994%29.epub`;
    let path = `https://ipfs.io/ipfs/${cid}?filename=teste.epub`;
    //[path, setPath] = useState(path);

    useEffect(() => {
        if (!cid){
            return;
        }
        // This is some basic code for using Monocle with EFM.
        // First, we need to tell zip.js where to find its accessory files.
        if (zip ===undefined){
            return;
        }
        zip.workerScriptsPath = "/libs/";
    
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

    // This will be called when the Epub object is fully initialized and
    // ready to get passed to the Monocle.Reader.
    function createReader(bookData) {
        Monocle.Reader("reader", bookData,  // The id of the reader element and the book data.
            {
                flipper: Monocle.Flippers.Instant,  // The rest is just fanciness:
                panels: Monocle.Panels.Magic
            },     // No animation and click anywhere
            function (reader) {                   // to turn pages.
                var stencil = new Monocle.Controls.Stencil(reader);  // Make internal links work.
                reader.addControl(stencil);
                var toc = Monocle.Controls.Contents(reader);         // Add a table of contents.
                reader.addControl(toc, 'popover', { hidden: true });
                createBookTitle(reader, { start: function () { reader.showControl(toc); } });
            }
        );
    }

    // This adds the book title to the top of each page.
    function createBookTitle(reader, contactListeners) {
        var bt = {}
        bt.createControlElements = function () {
            cntr = document.createElement('div');
            cntr.className = "bookTitle";
            runner = document.createElement('div');
            runner.className = "runner";
            runner.innerHTML = reader.getBook().getMetaData('title');
            cntr.appendChild(runner);
            if (contactListeners) {
                Monocle.Events.listenForContact(cntr, contactListeners);
            }
            return cntr;
        }
        reader.addControl(bt, 'page');
        return bt;
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