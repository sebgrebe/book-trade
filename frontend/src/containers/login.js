import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/message'
import $ from 'jquery'
import styles from '../styles/containers/login.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: null
    }
  }

  login(e) {
    e.preventDefault()
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    $.ajax({
      url: 'api/login',
      type: 'POST',
      data: {
          username: username,
          password: password
      },
      success: (res) => {
        if (res.success) {
          this.props.actions.updateUser(res.user)
          this.props.actions.updateAuthStatus(true)
          this.props.history.replace('/yourbooks')
        }
        else {
          this.setState({
            msg: "Login failed. "+res.msg+"."
          })
        }
      },
      error: (xhr) => {
          alert(xhr)
      }

    })
  }
  render() {
    return(
        <div className={styles.container}>
          <h2>Log in</h2>
          <form className={styles.form} onSubmit={(e) => this.login(e)}>
              <input id='username' className={styles.input} placeholder='Username' />
              <input id='password' type='password' className={styles.input} placeholder='Password' />
              <div className={styles.btn_container}>
                <button className={styles.btn}>Log in</button>
              </div>
          </form>
          <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
          <p>Forgot your password? Send an email to <a href='mailto:sebbecker.code@gmail.com'>sebbecker.code@gmail.com</a></p>
          <Message msg={this.state.msg} status='warning' />
        </div>
    )
  }
}

export default Login