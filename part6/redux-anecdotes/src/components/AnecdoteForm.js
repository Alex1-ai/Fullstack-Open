import { useDispatch } from "react-redux";
import  { createAnecdote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";
// import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const addAnecdote = async(event) =>{
        event.preventDefault();
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added "${content}" `, 5000))

        // clear notification after 5 seconds 
      
      }

    return (
        <>
          <h2>create new</h2>
            <form  onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
    
        </>

    )
}

export default AnecdoteForm