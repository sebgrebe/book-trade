import React from 'react'
import { Link } from 'react-router-dom'
import AddBooks from '../containers/addbooks'
import YourOffers from './youroffers'
import RequestedBooks from './requestedbooks'
import Trades from './trades'
import appStyles from '../styles/components/app.scss'

const YourBooks = ({state,actions}) => {

  return(
    <div>
      <h2>Welcome, {state.user.username}</h2>
      <div className={appStyles.status}>
        To see books offered by other users, go to the <Link to='/'>Home</Link> button.
      </div>
      <div className={appStyles.container}>
        <div className={appStyles.column}>
          <div className={appStyles.tile} >
            <YourOffers state={state} actions={actions}/>
            <AddBooks state={state} actions={actions}/>
          </div>
        </div>
        <div className={appStyles.column}>
          <RequestedBooks state={state} actions={actions} />
          <Trades state={state} actions={actions} />
        </div>
      </div>
    </div>
  )
}

export default YourBooks