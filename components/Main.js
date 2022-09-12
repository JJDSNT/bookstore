import React, { Component } from "react";
import Header from "./Header.js";
import BooksList from "./BooksList.js";
import Loading from "./Loading";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: false,
      noResults: false
    };
  }

  cleanDups(array) {
    return [...new Set(array)];
  }

  setBooks(userInput) {
    this.setState({
      books: [],
      loading: true,
      noResults: false
    });

    

    let options = {
      mirror: "/api/hello",
      //mirror: "http://gen.lib.rus.ec",
      query: userInput,
      count: 10
    };

    libgen.search(options, (err, data) => {
      console.log(options);
      if (err) {
        console.log(err);
        if (err.message.includes("No results for")) {
          this.setState({
            books: [],
            loading: false,
            noResults: true
          });
        } else console.error(err);
      } else {
        this.setState({
          books: this.cleanDups(data),
          loading: false,
          noResults: false
        });
      }
    });
  }

  render() {
    return (
      <div id="main">
        <Header
          updateBooks={this.setBooks.bind(this)}
          noResults={this.state.noResults}
        />
        <BooksList books={this.state.books} />
        <Loading
          loading={this.state.loading}
          type="spinningBubbles"
          color="#375d96"
        />
      </div>
    );
  }
}

export default Main;
