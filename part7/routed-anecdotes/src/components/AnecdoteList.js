/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
// import Table from 'react-bootstrap/Table'
// import { Table } from 'react-bootstrap'
// eslint-disable-next-line react/prop-types
const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        
            
        <ul>
                
            {anecdotes.map(
                anecdote =>
                    <li key={anecdote.id} >
                        <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
                    </li>)}
               
        </ul>
            
       
    </div>
)


export default AnecdoteList