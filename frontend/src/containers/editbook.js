import React, { Component } from 'react'
import $ from 'jquery'
import appStyles from '../styles/components/app.scss'
import faStyles from 'font-awesome/scss/font-awesome.scss'
import styles from '../styles/containers/editbook.scss'

class EditBook extends Component {
  constructor(props) {
    super(props)
    this.deleteBook = this.deleteBook.bind(this)
    this.tradeAction = this.tradeAction.bind(this)
  }

  deleteBook(e) {
    this.props.toggleEdit()
    $.ajax({
      url: '/api/deleteBook',
      type: 'POST',
      data: {
        book_id: this.props.book._id,
        user_id: this.props.state.user._id
      },
      success: (res) => {
        if (res.success) {
          this.props.actions.updateBooks(res.books)
        }
      }
    })
  }

  tradeAction(owner,receiver,status) {
    this.props.toggleEdit()
    let book = this.props.book
    book.trade.owner = owner
    book.trade.receiver = receiver
    book.trade.status = status
    $.ajax({
      url: '/api/tradeaction',
      type: 'POST',
      data: book,
      dataType: 'JSON',
      success: (res) => {
        this.props.actions.updateBooks(res.books)
      }
    })
  }

  render() {
    let status = this.props.book.trade.status
    let owner = this.props.book.trade.owner
    let receiver = this.props.book.trade.receiver
    let user_id = (this.props.state.user === undefined) ? undefined : this.props.state.user._id
    const findUserInfo = (id,info) => {
      let user_info = undefined
      this.props.state.users.map((user) => {
        if (user._id === id) {user_info = user[info] }
      })
      return user_info
    }
    if (!this.props.edit) return null
    if (this.props.state.authenticated === false) return (
      <div className={styles.container + ' ' + appStyles.alert}>
        <span>You need to be logged in to trade.</span>
      </div>
    )
    return(
      <div className={styles.container}>
        {status === 'available' && owner === user_id && (
          <span>Delete
            <button className={appStyles.btn_small} onClick={() => this.deleteBook()}>
              <i className={faStyles.fa + ' ' + faStyles["fa-trash"] + ' ' + styles.trash}></i>
            </button>
          </span>
        )}
        {status === 'available' && owner !== user_id && (
          <span>Request to trade
            <button className={appStyles.btn_small} onClick={() => this.tradeAction(owner,user_id,'requested')}>
              <i className={faStyles.fa + ' ' + faStyles["fa-handshake-o"] + ' ' + styles.request}></i>
            </button>
          </span>
        )}
        {status === 'requested' && receiver === user_id && (
          <span>Withdraw request
            <button className={appStyles.btn_small} onClick={() => this.tradeAction(owner,'','available')}>
              <i className={faStyles.fa + ' ' + faStyles["fa-times"] + ' ' + styles.withdraw}></i>
            </button>
          </span>
        )}
        {status === 'requested' && owner === user_id && (
          <div>
            <span>Accept request
              <button className={appStyles.btn_small} onClick={() => this.tradeAction(owner,receiver,'traded')}>
                <i className={faStyles.fa + ' ' + faStyles["fa-handshake-o"] + ' ' + styles.accept}></i>
              </button>
            </span>
            <span>Deny request
              <button className={appStyles.btn_small} onClick={() => this.tradeAction(owner,'','available')}>
                <i className={faStyles.fa + ' ' + faStyles["fa-times"] + ' ' + styles.withdraw}></i>
              </button>
            </span>
          </div>
        )}
        {status === 'traded' && owner === user_id && (
          <div>
            <p>You agreed to trade this book with {findUserInfo(receiver, 'username')}</p>
            <p>Contact them at {findUserInfo(receiver, 'email')}.</p>
            <span>Delete entry
            <button className={appStyles.btn_small} onClick={() => this.deleteBook()}>
              <i className={faStyles.fa + ' ' + faStyles["fa-trash"] + ' ' + styles.trash + ' ' + styles.btn}></i>
            </button>
            </span>
          </div>
        )}
        {status === 'traded' && receiver === user_id && (
          <div>
            <p>{findUserInfo(owner, 'username')} agreed to trade this book with you.</p>
            <p>Contact them at {findUserInfo(owner, 'email')}.</p>
            <span>Delete entry
            <button className={appStyles.btn_small} onClick={() => this.deleteBook()}>
              <i className={faStyles.fa + ' ' + faStyles["fa-trash"] + ' ' + styles.trash + ' ' + styles.btn}></i>
            </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default EditBook