import React, { Component } from 'react'
import $ from 'jquery'
import appStyles from '../styles/components/app.scss'
import faStyles from 'font-awesome/scss/font-awesome.scss'
import styles from '../styles/containers/profileinfo.scss'

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  update(e) {
    e.preventDefault()
    const info_new = document.getElementById('input').value
    $.ajax({
      url: '/api/updateprofile',
      type: 'POST',
      data: {
        property: this.props.tag,
        content: info_new
      },
      success: (res) => {
        this.setState({
          edit: false
        })
        let msg_obj = {}
        if (res.success) {
          msg_obj = {
            content: res.msg,
            status: 'success'
          }
          this.props.actions.updateUser(res.user[0])
          this.props.updateMessage(msg_obj)
        }
        else {
          msg_obj = {
            content: res.msg,
            status: 'warning'
          }
          this.props.updateMessage(msg_obj)
        }
      }
    })
  }

  showEdit() {
    console.log('edit')
    let bool = (this.state.edit === true) ? false : true
    this.setState({
      edit: bool
    })
  }

  render() {
    return(
      <div>
        <div className={styles.info}>
          <div className={styles.tag}>
            <b>{this.props.tag}:</b> {this.props.info}
          </div>
          <button className={appStyles.btn_small + ' ' + styles.edit} onClick={() => this.showEdit()}>
            <i className={faStyles.fa + ' ' + faStyles['fa-edit']}></i>
          </button>
        </div>
      {this.state.edit && (
        <form className={styles.form} onSubmit={(e) => this.update(e)}>
          <div>
            <input id="input" className={styles.input} placeholder={'Update your ' + this.props.tag}></input>
            <button className={styles.btn}>OK</button>
          </div>
        </form>
      )}
      </div>
    )
  }
}

export default ProfileInfo