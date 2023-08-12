

import { useMutation, useQuery, useQueryClient} from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
// import axios

const AnecdoteList = ()=>{
    const  notificationDispatch = useNotificationDispatch()
 
  const queryClient = useQueryClient()
 
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () =>{
      queryClient.invalidateQueries('anecdotes')
    }
     })
    



    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
        notificationDispatch({type: 'SHOW_NOTIFICATION', payload:`anecdote ${anecdote.content} voted`})
        // dispatch({type: 'SHOW_NOTIFICATION', payload:`anecdote ${anecdote.content} voted`})
        console.log('vote')
      }
    
      const result = useQuery(
        "anecdotes",
        getAnecdotes,
        {
          // retry: 1
          retry: false
        }
        // ()=>axios.get('http://localhost:3001/anecdotes').then(res=>res.data)
      )
      console.log(result)
    
      if (result.isLoading){
        return <div>loading data....</div>
      }
    
      if (result.isError){
        return <div>anecdote service not available due to problem in server </div>
      }
      const anecdotes = result.data
    return (
        <>
          {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    
        
        </>
    )
    
}


export default AnecdoteList