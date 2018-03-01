import React, {Component} from 'react'
import ProfileInfo from '../containers/profileinfo'
import styles from '../styles/components/profile.scss'
import Message from '../components/message'

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      msg: {
        content: null,
        status: null
      }
    }
    this.updateMessage = this.updateMessage.bind(this)
  }

  updateMessage(msg_obj) {
    this.setState({
      msg: msg_obj
    })
  }

  render() {
    const user = this.props.state.user
    return (
      <div className={styles.container}>
        <h2>Your Profile</h2>
        <div className={styles.box}>
          <ProfileInfo tag="Username" info={user.username} updateMessage={this.updateMessage} actions={this.props.actions}/>
          <ProfileInfo tag="Email" info={user.email} updateMessage={this.updateMessage} actions={this.props.actions}/>
          <ProfileInfo tag="City" info={user.city} updateMessage={this.updateMessage} actions={this.props.actions}/>
          <ProfileInfo tag="Country" info={user.country} updateMessage={this.updateMessage} actions={this.props.actions}/>
        </div>
        <Message msg={this.state.msg.content} status={this.state.msg.status} />
      </div>
    )
  }
}

export default Profile