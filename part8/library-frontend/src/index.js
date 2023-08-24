import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from "@apollo/client"

import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('books-user-token')
  console.log("user ",token)


  return {
    headers:{
    ...headers,
    authorization: token ? `bearer ${token}`:null
    }
  }
})


const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

// const client = new ApolloClient({
//     // uri: "http://localhost:4000",
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink)
// })

// const query = gql`

//     query {
//         allBooks {
//             title,
//             author,
//             genres,
//             published,
//             id


//         }
//     }




// `
// client.query({ query })
//    .then((response)=>{
//     console.log(response)
//    })
ReactDOM.createRoot(document.getElementById('root')).render(

  <ApolloProvider client={client}>
       <App />
  </ApolloProvider>
    


)