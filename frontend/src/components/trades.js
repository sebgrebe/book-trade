import React from 'react'
import Book from '../containers/book'
import appStyles from  '../styles/components/app.scss'

const Trades = ( {state,actions} ) => {
  const books = state.books
  const user_id = state.user._id

  if (books === undefined) return <div className={styles.status}>Loading...</div>

  let traded_books = []
  books.map((book) => {
    if (book.trade.status === 'traded' && book.trade.owner === user_id) {
      return traded_books.push(book)
    }
    return null
  })
  return(
    <div className={appStyles.tile}>
      <h3>Trades</h3>
      <div className={appStyles.container}>
      {traded_books.length === 0 ? (
        <div className={appStyles.status}>You have not agreed to any trades</div>
      ) : (traded_books.map((book) =>
          <Book book={book} state={state} actions={actions} />
        ))
        }
      </div>
    </div>
  )
}

export default Trades