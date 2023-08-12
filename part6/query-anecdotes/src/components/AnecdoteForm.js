import {  QueryClient, useMutation, useQueryClient } from 'react-query'
import {  createAnecdote } from '../requests'
// import { useContext } from 'react'
// import {NotificationContext }from '../NotificationContext'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote,
    {
      onSuccess: (newAnecdote) =>{
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.invalidateQueries('anecdotes', anecdotes.concat(newAnecdote))
      },
      onError:(error)=>{
        notificationDispatch({
          type: 'SHOW_NOTIFICATION',
          payload:` 'too short anecdote, must have length 5 or more'`,
        })

        // console.log("An error occurred", error)
      }
      
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    notificationDispatch({
      type: 'SHOW_NOTIFICATION',
      payload: `anecdote '${content}' added`,
    })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
