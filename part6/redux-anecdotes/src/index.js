import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// import { configureStore } from "@reduxjs/toolkit"
import App from './App'
import store from './store'

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)