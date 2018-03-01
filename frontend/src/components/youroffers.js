import React from 'react'
import Book from '../containers/book'
import appStyles from '../styles/components/app.scss'


const YourOffers = ( {state,actions} ) => {
  let books = state.books
  const user_id = state.user._id
  let your_books = []
  books.map((book) => {
    if (book.trade.owner === user_id && book.trade.status !== 'traded') {
      return your_books.push(book)
    }
    return null
  })
  if (books === undefined) {
    return <div>Loading...</div>
  }
  return(
    <div>
      <h3>Your offers</h3>
      <div className={appStyles.container}>
        {your_books.length > 0 ? (
          your_books.map((book) =>
              <Book book={book} state={state} actions={actions} />
            ) : null
          ) : (
          <div className={appStyles.status}>You have no books on offer</div>
          )
        }
      </div>
    </div>
  )
}

export default YourOffers