import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/app'
import history from './history'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();


