import React, {Component} from 'react'
import EditBook from './editbook'
import Availability from '../components/availability'
import styles from '../styles/containers/book.scss'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
    }
    this.toggleEditOption = this.toggleEditOption.bind(this)
  }

  toggleEditOption(e) {
    if (e !== undefined) {e.preventDefault()}
    this.setState({
      edit: (this.state.edit) ? false : true
    })
  }

  render() {
    let book = this.props.book
    if (book === null) return null
    return(
      <div className={styles.container}>
        <div className={styles.book + ' ' + styles.select} onClick={(e) => this.toggleEditOption(e)}>
          <Availability status={book.trade.status} />
          <img alt="book cover" className={styles.img} src={book.img}/>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.author}>{book.authors}</div>
        </div>
        <EditBook edit={this.state.edit} book={this.props.book} state={this.props.state} actions={this.props.actions} toggleEdit={this.toggleEditOption} />
      </div>
    )
  }
}

export default Book

