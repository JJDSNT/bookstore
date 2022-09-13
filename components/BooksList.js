import React, { Component } from "react";
import Image from 'next/image'
import style from "./BooksList.module.css";

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.createBook = this.createBook.bind(this);
  }

  createBook(book) {
    let title = book.title;
    let author = book.author;
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
            href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${encodeURIComponent(book.title)}.${book.extension}`}
          >
            Download
          </a>
          <a
            className={style.download}
            href={`https://ipfs.io/ipfs/${book.ipfs_cid}?filename=${encodeURIComponent(book.title)}.${book.extension}`}
          >
            Ler
          </a>
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
