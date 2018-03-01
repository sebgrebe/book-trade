import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/message'
import $ from 'jquery'
import styles from '../styles/containers/login.scss'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: null
    }
  }
  checkInput(inputs,labels) {
    let missing_inputs = ''
    inputs.map((input,i) => {
      if (input === "") {
        if (missing_inputs === "") {
          missing_inputs = labels[i]
        }
        else {
          missing_inputs = missing_inputs + ", " + labels[i]
        }
      }
    })
    return missing_inputs
  }
  signUp(e) {
    e.preventDefault()
    let inputs = [
      document.getElementById('username').value,
      document.getElementById('password').value,
      document.getElementById('email').value,
      document.getElementById('city').value,
      document.getElementById('country').value,
    ]
    const input_labels = ['username', 'password', 'email', 'city', 'country']
    const missing_inputs = this.checkInput(inputs,input_labels)
    if (missing_inputs !== "") {
      this.setState({
          msg: 'You forgot to enter your: '+missing_inputs
        })
      }
    else {
      $.ajax({
        url: '/api/signup',
        type: 'POST',
        data: {
          username: inputs[0],
          password: inputs[1],
          email: inputs[2],
          city: inputs[3],
          country: inputs[4]
        },
        success: (res) => {
          if (res.success) {
            this.props.actions.updateUser(res.user)
            this.props.actions.updateAuthStatus(true)
            this.props.history.replace('/yourbooks')
          }
          else {
            this.setState({
              msg: res.msg + "."
            })
          }
        },
        error: (xhr) => {
          alert(xhr.responseText)
        }
      })
    }
  }
  render() {
    return(
      <div className={styles.container}>
        <h2>Sign up</h2>
        <form className={styles.form} onSubmit={(e) => this.signUp(e)}>
          <input id='username' className={styles.input} placeholder='Username' />
          <input id='email' className={styles.input} placeholder='Email'/>
          <input id='city' className={styles.input} placeholder='City' />
          <input id='country' className={styles.input} placeholder='Country' />
          <input id='password' type='password' className={styles.input} placeholder='Create Password' />
          <div className={styles.btn_container}>
            <button className={styles.btn}>Signup</button>
          </div>
        </form>
        <p>You already have an account? Log in <Link to="/login">here</Link></p>
        <Message msg={this.state.msg} status='warning' />
      </div>
    )
  }
}

export default Signup