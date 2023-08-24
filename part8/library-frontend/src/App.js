import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendation from './components/Recommendation'
import { useQuery, useMutation, useSubscription} from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Notify from './components/Notify'
import { updateCache } from './updateCache'
// import { gql , useQuery} from "@apollo/client"

// const ALL_AUTHORS = gql`
//     query {
//       allAuthors {
//         name
//         id
//         born
//         bookCount

//       }
//     }


// `

// const ALL_BOOKS = gql`
//     query {
//       allBooks {
//         title
//         author
//         published
//       }
//     }


// `




const App = () => {
  // const authors = useQuery(ALL_AUTHORS)

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  useSubscription(BOOK_ADDED,{
    onData: ({ data,client })=>{
      const addedBook = data.data.addedBook
      Notify(`${addedBook.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS}, addedBook)

      // client.cache.updateQuery({query: BOOK_ADDED}, ({ allBooks })=>{
      //   return {
      //     allBooks: allBooks.concat(addedBook)
      //   }
      // })
      console.log(data)
    }
  })


  useEffect(()=>{
    const localToken =localStorage.getItem("books-user-token")
    console.log("local storage ",localToken)
    if (localToken){
      setToken(localToken)
    }
  },[token])

  const logout = () =>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // if (!token){
  //   return(
  //     <div>
  //       <LoginForm setToken={setToken}/>
  //     </div>
  //   )
  // }

  
  // if (authors.loading) {
  //   return <div>loading....</div>
  // }
  // console.log(authors.data.allAuthors)
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        { token === null ? <button onClick={()=>setPage('login')}>login</button>
        :<>

        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={()=> setPage('recommend')}>recommend</button>
        
        <button onClick={logout}>logout</button>
        </>
        }
      </div>

      <Authors show={page === 'authors'}  />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page==='login'} setPage={setPage} setToken={setToken}/>

      <Recommendation show={page==='recommend'} />


    </div>
  )
}

export default App
