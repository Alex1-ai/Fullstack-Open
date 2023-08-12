import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name:'notification',
    initialState: null,
    reducers: {
        Notification: (state, action)=>{
            return action.payload
        },
        clearNotification: () => null,
    }
})

export const { Notification, clearNotification} = notificationSlice.actions

export const setNotification = (message, timeout) =>{
    return async dispatch =>{
    //   const updatedAnecdote = await anecdoteService.incrementVote(id)
      dispatch(Notification(message))
      setTimeout(()=>{
        dispatch(clearNotification())
      }, timeout)
  
  
    }
  }


export default notificationSlice.reducer