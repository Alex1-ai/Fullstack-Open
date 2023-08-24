import { useState } from 'react'
import {  useApolloClient, useMutation, useQuery,useSubscription} from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED, CREATE_BOOK } from '../queries'
import Notify from './Notify'
import { updateCache } from '../updateCache'
// import { useQuery, useMutation, useSubscription} from '@apollo/client'
// import { BOOK_ADDED } from './queries'
// import Notify from './components/Notify'
// const CREATE_BOOK = gql`
// mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
//   addBook(title: $title, published: $published, author: $author, genres: $genres) {
//     title
//     author
//     published
//   }
// }    
// `

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const allBooksQuery = useQuery(ALL_BOOKS); 
  const client = useApolloClient()
  const [ createBook] =useMutation(CREATE_BOOK, {
    // refetchQueries:[{query:ALL_BOOKS}],
     // Alternatively, you can use the "update" option
    
    onError: (error)=>{
      console.log(error)
      const errors = error.graphQLErrors[0]
      const messages = Object.values(errors).map(e => e.message).join('\n')
      setErrorMessage(messages)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)

    },

    update: (cache, response) => {
      // cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      //   return {
      //     allBooks: allBooks.concat(response.data.addBooks),
      //   }
      // })
    
      updateCache(cache, { query: ALL_BOOKS}, response.data.addBook)
      // const addedBook = response.data.addBook; // Extract the new book data
      // const { allBooks } = cache.readQuery({ query: ALL_BOOKS });
      // cache.writeQuery({
      //   query: ALL_BOOKS,
      //   data: { allBooks: allBooks.concat(addedBook) },
      // });
    },
    

  })
  useSubscription(BOOK_ADDED,{
    onData: ({ data })=>{
      const addedBook = data.data.addedBook
      Notify(`${addedBook.name} added`)

      client.cache.updateQuery({query: BOOK_ADDED}, ({ allBooks })=>{
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
      console.log(data)
    }
  })



  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    // const published  =setPublished(Number(published))
    console.log("data ", title, published, author, genres)
    createBook({variables:{title,published,author,genres}})
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>


      
    </div>
  )
}

export default NewBook