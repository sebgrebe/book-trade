import React from 'react'
import Book from '../containers/book'
import { Link } from 'react-router-dom'
import appStyles from '../styles/components/app.scss'

const Home = ({state, actions}) => {
    const books = state.books
    if (books === undefined) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>Books on Book-Trade</h2>
        <h5><Link to={'/login'}>Log in</Link> or <Link to={'/signup'}>sign up</Link> to start trading</h5>
        <div className={appStyles.container}>
          {books.length > 0 ? (
            books.map((book,i) =>
              <Book book={books[i]} state={state} actions={actions}/>
            )) : (
            <div className={appStyles.status}>There are no books on book-trade at the moment</div>
          )}
        </div>
      </div>
    )
  }


export default Home;