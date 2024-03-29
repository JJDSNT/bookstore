import React, { Component } from "react";
import Header from "./Header.js";
import BooksList from "./BooksList.js";
import Loading from "./Loading";
import Pagination from "./Pagination.js";
import { getStoredBookList, setStoredBook } from '../book-storage/index';
import { livros } from "../book-storage/BooksList";

let livrosdostorage = [];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [...livrosdostorage],
      loading: false,
      noResults: false,
      offset: 0,
      pagination: false,
      query: "",
      extension: ""
    };
  }



  componentDidMount() {

    livrosdostorage = getStoredBookList();

    if (livrosdostorage.length>0) {
      console.log('livrosdostorage');
      this.setState({ books: livrosdostorage });
    } else {
      for (let livro of livros) {
        setStoredBook(livro);
      }
    }
  }


  cleanDups(array) {
    return [...new Set(array)];
  }

  paginationSearch(offset) {
    this.setBooks(this.state.query, this.state.extension, offset)
  }

  setBooks(userInput, userExtension, offset) {

    this.setState({ query: userInput });
    this.setState({ extension: userExtension });
    this.setState({ offset: offset });

    this.setState({
      books: [],
      loading: true,
      noResults: false,
      empty: true,
      offset: offset,
      pagination: false,
      paginar: true
    });

    fetch("/api/search", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({ query: userInput, extension: userExtension, offset: offset })
    })
      .then(response => {
        // handle the response
        //handle no result error?
        //console.log(response.json());
        return response.json();
      })
      .then(data => {
        if (data.paginar === false) {
          this.setState({ paginar: false })
        }
        let empty = false;
        //console.log(Array.isArray(data));
        if (Array.isArray(data)) { data = this.cleanDups(data) } else {
          data = [];
          empty = true
        };
        //console.log(data);
        this.setState({
          books: data,
          loading: false,
          noResults: false,
          pagination: true
        });

      })
      .catch(err => {
        if (err.message.includes("No results for")) {
          this.setState({
            books: [],
            loading: false,
            noResults: true,
            pagination: false
          });
        } else console.error(err);
      });

  }

  render() {
    return (
      <div id="main">
        <Header
          updateBooks={this.setBooks.bind(this)}
          noResults={this.state.noResults}
        />
        <Pagination
          pagination={this.state.pagination}
          offset={this.state.offset}
          paginationSearch={this.paginationSearch.bind(this)}
          paginar={this.state.paginar} />
        <BooksList books={this.state.books} />
        <Loading
          loading={this.state.loading}
          type="spinningBubbles"
          color="#375d96"
        />
        <Pagination
          pagination={this.state.pagination}
          offset={this.state.offset}
          paginar={this.state.paginar}
          paginationSearch={this.paginationSearch.bind(this)} />
      </div>
    );
  }
}

export default Main;
