import React from 'react'
import styles from '../styles/components/availability.scss'
import faStyles from 'font-awesome/scss/font-awesome.scss'

const Availability = ( {status} ) => (
  <div className={styles.container}>
  {status === 'available' && (
    <div className={styles.tooltip} title="Available">
      <i className={faStyles.fa + " " + faStyles['fa-check'] + ' ' + styles.available} ></i>
    </div>
  )}
  {status === 'requested' && (
    <div className={styles.tooltip} title="Requested">
      <i className={faStyles.fa + " " + faStyles['fa-clock-o'] + ' ' + styles.requested} ></i>
    </div>
  )}
  {status === 'traded' && (
    <div className={styles.tooltip} title="Traded">
      <i className={faStyles.fa + " " + faStyles['fa-handshake-o'] + ' ' + styles.traded} ></i>
    </div>
  )}
  </div>
)

export default Availability