import React, {Component} from 'react'
import $ from 'jquery'
import appStyles from '../styles/components/app.scss'
import bookStyles from '../styles/containers/book.scss'
import faStyles from 'font-awesome/scss/font-awesome.scss'
import styles from '../styles/containers/addbooks.scss'

class AddBooks extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.state = {
      search_results: [],
      searching: false
    }
  }

  addBook(book) {
    const book_added = {
      authors: book.volumeInfo.authors,
      title: book.volumeInfo.title,
      img: this.checkImg(book)
    }
    console.log(book_added)
    $.ajax({
      url:'/api/addbook',
      type: 'POST',
      data: {
        book: book_added,
        user_id: this.props.state.user._id
      },
      success: (res) => {
        if (res.success) {
          this.props.actions.updateBooks(res.book)
        }
      },
      error: (xhr) => {
        alert(xhr.responseText)
      }
    })
  }

  checkImg(book) {
    const img_url = (book.volumeInfo.imageLinks === undefined) ? '/book_icon.svg' : book.volumeInfo.imageLinks.thumbnail
    return img_url
  }

  search(e) {
    e.preventDefault()
    let query = document.getElementById('search').value
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + query,
      type: 'GET',
      success: (res) => {
        this.setState({
          search_results: res.items,
          searching: true
        })
      }
    })
  }

  stopSearching() {
    this.setState({
      searching: false
    })
  }

  render() {
    return (
      <div>
        <h4>Add books</h4>
        <div className={styles.bar}>
          <form className={styles.search} onSubmit={(e) => this.search(e)}>
            <input id="search" className={styles.input} placeholder='Search for books to add'/>
            <button>Search</button>
          </form>
          {this.state.searching ? (
            <button className={appStyles.btn_small + ' ' + styles.btn} onClick={() => this.stopSearching()}><i className={faStyles.fa + ' ' + faStyles['fa-times']}></i></button>
          ) : (
            <span className={appStyles.btn_small + ' ' + styles.btn}></span>
          )}
        </div>
        {this.state.searching && (
          <div className={appStyles.container}>
            {this.state.search_results.length > 0 ? (
              this.state.search_results.map((book) =>
                <div className={bookStyles.book + ' ' + bookStyles.select} onClick={() => this.addBook(book)}>
                  <img alt="book cover" className={bookStyles.img} src={this.checkImg(book)} />
                  <div className={bookStyles.title}>{book.volumeInfo.title}</div>
                  <div className={bookStyles.author}>{book.volumeInfo.authors}</div>
                </div>
              )) : null
            }
          </div>
        )}

      </div>
    )
  }
}

export default AddBooks