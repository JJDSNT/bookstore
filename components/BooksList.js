import React, { Component } from "react";
import Link from 'next/link'
import style from "./BooksList.module.css";
import { setStoredBook } from '../book-storage/index';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.createBook = this.createBook.bind(this);
  }

  createBook(book) {
    let title = book.title;
    let author = book.author;
    let cover = encodeURIComponent(book.coverurl);
    //encodeURIComponent
    let url = `/read/${book.ipfs_cid}?coverid=` + cover + `&name=${book.title}`;

    if (book.title.length > 70) {
      title = `${book.title.slice(0, 70)}...`;
    }
    if (book.title.author > 30) {
      title = `${book.author.slice(0, 30)}...`;
    }
    return (
      <div className={style.book} key={book.id}>
        <img
          src={`https://libgen.rs/covers/${book.coverurl}`}
          alt="Book Cover"
          className={style.bookCover}
        />
        <div className={style.info}>
          <p className={style.bookTitle}>{title}</p>
          <p className={style.bookAuthor}>{author}</p>
          <a
            className={style.download}
            href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${book.title}.${book.extension}`}
          >
            Download
          </a>
          <Link onClick={()=>setStoredBook(book)} href={url} className={style.download} >Read</Link>
          {book.extension}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={style.booksContainer}>
        {this.props.books.map(this.createBook)}
      </div>
    );
  }
}

export default BooksList;
