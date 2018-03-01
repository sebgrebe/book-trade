import React from 'react'
import Book from '../containers/book'
import appStyles from '../styles/components/app.scss'

const RequestedBooks = ( {state, actions} ) => {
  const books = state.books
  const user_id = state.user._id
  if (books === undefined) return <div className={style.status}>Loading...</div>
  const requested_books = []
  books.map((book) => {
    if (book.trade.receiver === user_id && (book.trade.status === 'requested' || book.trade.status === 'traded')) {
      return requested_books.push(book)
    }
    return null
  })
  return (
    <div className={appStyles.tile}>
      <h3>Books you requested</h3>
      {requested_books.length === 0 ? (
        <div className={appStyles.status}>You have not requested any books</div>
      ) : (
        <div className={appStyles.container}>
          {requested_books.map((book) =>
            <Book book={book} state={state} actions={actions}/>)
          }
        </div>
      )}
    </div>
  )
}

export default RequestedBooks