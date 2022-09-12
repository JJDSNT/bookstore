import React, { Component } from "react";
import Image from 'next/future/image'
import style from "./Header.module.css";
import Logoteste from '../assets/readmoreFullLogo.svg'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    if (
      this._inputElement.value.length &&
      this._inputElement.value.length >= 4
    ) {
      this.setState({
        error: false
      });
      this.props.updateBooks(this._inputElement.value);
    } else {
      this.setState({
        error: true
      });
    }
  }

  render() {
    return (
      <div className={style.header}>
        <Image className={style.logo} src={Logoteste} alt="Logo" />
        <div className={style.searchContainer}>
          <form className={style.searchBar} onSubmit={this.search}>
            <input
              ref={a => (this._inputElement = a)}
              className={style.searchInput}
              type="text"
              placeholder="Find a book..."
            />
            <button className={style.searchButton} type="submit">
              <i className="fas fa-search" />
              <p className={style.searchButtonText}>Search</p>
            </button>
          </form>
          <p className={`error ${this.state.error ? "" : "hidden"}`}>
            Search must be atleast 4 characters
          </p>
          <p className={`error ${this.props.noResults ? "" : "hidden"}`}>
            No results
          </p>
        </div>
      </div>
    );
  }
}

export default Header;
