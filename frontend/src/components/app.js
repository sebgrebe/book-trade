import React from 'react'
import $ from 'jquery'
import { Route, Redirect, withRouter } from 'react-router-dom'
import * as Actions from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from './home'
import Login from '../containers/login'
import Signup from '../containers/signup'
import Yourbooks from './yourbooks'
import Navbar from '../containers/navbar'
import Profile from './profile'

const App = ( {state,actions} ) => {

  //check user authentication status and load user data
  if (!state.authenticated) {
    $.ajax({
      url: '/api/authenticated',
      type: 'GET',
      success: (res) => {
        if (res.authenticated !== state.authenticated) {
          actions.updateAuthStatus(res.authenticated)
        }
        if (res.authenticated) {
          actions.updateUser(res.user)
        }
      },
      error: (xhr) => {
        alert(xhr)
      }
    })
  }

  //load book data
  if (state.books.length === 0) {
    $.ajax({
      url: '/api/getbooks',
      type: 'GET',
      success: (res) => {
        if (res.books.length > 0) {
          actions.updateBooks(res.books)
        }
      },
      error: (xhr) => {
        alert(xhr.responseText)
      }
    })
  }

  //load users list when page refreshes
  if (state.users.length === 0 && state.authenticated) {
    $.ajax({
      url: '/api/getusers',
      type: 'GET',
      success: (res) => {
        if (res.success) {
          actions.updateUsers(res.users)
        }
      },
      error: (xhr) => {
        alert(xhr)
      }
    })
  }

  return (
    <div>
      <Route path="/" render={(props) => <Navbar state={state} actions={actions} {...props} />} />
      <Route exact path="/" render={(props) => <Home state={state} actions={actions} {...props} />} />
      <Route path="/login" render={(props) => (
        state.authenticated ? (
          <div>
            <Redirect to='/yourbooks' />
            <Yourbooks state={state} actions={actions} {...props} />
          </div>
        ) : (
          <Login state={state} actions={actions} {...props} />
        )
      )}/>
      <Route path="/signup" render={(props) => (
        state.authenticated ? (
          <div>
            <Redirect to='/yourbooks' />
            <Yourbooks state={state} actions={actions} {...props} />
          </div>
        ) : (
          <Signup state={state} actions={actions} {...props} />
        )
      )}/>
      <Route path="/yourbooks" render={(props) =>
        state.authenticated ? (
          <Yourbooks state={state} actions={actions} {...props} />
        ) : (
          <div>
            <Redirect to='/login' />
            <Login state={state} actions={actions} {...props} />
          </div>
        )
      }/>
      <Route path="/profile" render={(props) =>
        state.authenticated ? (
          <Profile state={state} actions={actions} />
        ) : (
          <Redirect to='/' />
        )
      }/>
    </div>
    )
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
