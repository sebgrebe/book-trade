import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from '../styles/main.scss'

class Navbar extends Component {
  constructor(props) {
      super(props)
  }

  logout(e) {
    e.preventDefault()
    $.ajax({
      url: '/api/logout',
      type: 'GET',
      success: (res) => {
        this.props.actions.updateAuthStatus(false)
        this.props.actions.updateUser(undefined)
      },
      error: (xhr) => {
        alert(xhr)
      }
    })
  }

  render() {
    return(
      <nav className={styles.navbar + " " + styles["navbar-expand-md"] + " " + styles["navbar-light"] + " " + styles["bg-light"]}>
        <a className={styles['navbar-brand']} href="/">Book-Trade</a>
        <button className={styles['navbar-toggler'] + " " + styles['navbar-toggler-right']} type="button" data-toggle="collapse" data-target="#options" aria-controls="options" aria-expanded="false" aria-label="Toggle navigation">
          <span className={styles['navbar-toggler-icon']}></span>
        </button>
        <div className={styles['navbar-collapse'] + ' ' + styles.collapse} id="options">
        {!this.props.state.authenticated ? (
          <ul className={styles['navbar-nav'] + " " + styles['ml-auto']}>
            <li><a className={styles['nav-link']} href='/login'>Log in</a></li>
          </ul> ) : (
          <ul className={styles['navbar-nav'] + " " + styles['ml-auto']}>
            <li><Link className={styles['nav-link']} to='/yourbooks'>Your Books</Link></li>
            <li><Link className={styles['nav-link']} to='/profile'>Profile</Link></li>
            <li><Link className={styles['nav-link']} to="/" onClick={(e) => this.logout(e)}>Logout</Link></li>
          </ul>
          )
        }
        </div>
      </nav>
    )
  }
}

export default Navbar

