import React, { Component } from "react";
import Image from 'next/future/image'
import style from "./Header.module.css";
import Logoteste from '../assets/readmoreFullLogo.svg'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      extension:"epub"
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({extension: e.target.value });
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
      this.props.updateBooks(this._inputElement.value,this.state.extension);
    } else {
      this.setState({
        error: true
      });
    }
  }

  getStyle(state) { if (!state) return style.hidden; else return style.error }

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
            <select onChange={this.handleChange}>
              <option defaultValue value="epub">ePub</option>
              <option value="pdf">PDF</option>
              <option value="">All</option>
            </select>
            <button className={style.searchButton} type="submit">
              <i className="fas fa-search" />
              <p className={style.searchButtonText}>Search</p>
            </button>
          </form>
          <p className={this.getStyle(this.state.error)}>
            Search must be atleast 4 characters
          </p>
          <p className={this.getStyle(this.props.noResults)}>
            No results
          </p>
        </div>
      </div>
    );
  }
}

export default Header;
