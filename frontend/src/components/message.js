import React from 'react'
import styles from '../styles/components/message.scss'

const Message = ( {msg, status} ) => (
  msg !== null ? (
    <div className={styles.box + " " + styles[status]}>{msg}</div>
  ) : (
    null
  )
)

export default Message