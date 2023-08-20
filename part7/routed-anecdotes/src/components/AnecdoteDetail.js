import { useParams,} from 'react-router-dom'
import React from 'react'
// eslint-disable-next-line react/prop-types
const AnecdoteDetail = ({ anecdotes }) => {
    const id = useParams().id
    // eslint-disable-next-line react/prop-types
    const anecdote = anecdotes.find(anecdote=>anecdote.id===Number(id))
  
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p> has {anecdote.votes} votes</p>
            {/* <ul>
        {anecdotes.map(
          anecdote =>
           <li key={anecdote.id} >
             <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
           </li>)} 
      </ul>*/}
        </div>
    )
}

    
export default AnecdoteDetail