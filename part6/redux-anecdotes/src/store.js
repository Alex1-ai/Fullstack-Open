import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer   from './reducers/anecdoteReducer'
import filtereReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/notificationReducer"



const store = configureStore({
    reducer:{
    anecdotes: anecdoteReducer,
    filter: filtereReducer,
    notification: notificationReducer
    }
  })

// anecdoteService.getAll().then(anecdotes =>
//     anecdotes.forEach(anecdote =>{
//         store.dispatch(appendAnecdote(anecdote))
//         // store.dispatch(appendAnecdote(anecdote))
//     })
    
//     )
// anecdoteService.getAll().then(anecdotes=>
//     store.dispatch(setAnecdotes(anecdotes)))
// store.dispatch(initializeAnecdotes())
// initializeAnecdotes()

  export default store