import anecdoteService from "../services/anecdotes"
import { createSlice } from "@reduxjs/toolkit"
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// export const incrementVote = (id) => {
//   console.log('vote', id)
//    return {
//     type: 'VOTE',
//     payload:{id}

//    }
    
    

// }


// export const createAnecdote = (anecdote) =>{
//   return {
//     type:'NEW_ANECDOTE',
//     payload: {
//       content:anecdote,
//       votes:0,
//       id: getId()
//     }
//   }
// }
const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    // createAnecdote (state, action){
    //   state.push(action.payload)
    // },
    // createAnecdote  (state, action) {
    //   console.log('state now: ', state)
    //   console.log('action', action)
    //   const anecdote = action.payload
    //   state.push( {
        
    //       content:anecdote,
    //       votes:0,
    //       id: getId()
    //     }
    //   )
    // },

    vote  (state, action)  {
      const updatedAnecdote = action.payload
      // console.log('vote', id)

      // const anecdoteToChange = state.find(anecdote=>anecdote.id === id)
      // const changeAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1
      // }
      return state.map(anecdote =>anecdote.id !== updatedAnecdote.id ? anecdote: updatedAnecdote)
    },

    appendAnecdote(state, action){
      state.push(action.payload)
    },

    setAnecdotes(state, action){
      return action.payload
    }



  }
})


export const { vote,  appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export const createAnecdote = content =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = id =>{
  return async dispatch =>{
    const updatedAnecdote = await anecdoteService.incrementVote(id)
    dispatch(vote(updatedAnecdote))


  }
}

export default anecdoteSlice.reducer
// export default reducer