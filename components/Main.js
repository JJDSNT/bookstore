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
    /*
    (async () => {
      const rawResponse = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({a: 1, b: 'Textual content'})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
    */
    fetch("/api/search",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      ,body: JSON.stringify({query: userInput})
      })
      .then(response => {
        // handle the response

        //console.log(response.json());
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          books: this.cleanDups(data),
          loading: false,
          noResults: false
        });

      })
      .catch(err => {
        console.log(err);
        if (err.message.includes("No results for")) {
          this.setState({
            books: [],
            loading: false,
            noResults: true
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
