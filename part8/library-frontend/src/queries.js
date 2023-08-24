import { gql } from '@apollo/client'



export const LOGIN = gql`
 mutation login($username: String!, $password: String!){
  login(username: $username, password: $password) {
    value
  }
 }


`

const BOOK_DETAILS = gql`
   fragment BookDetails on Book {
        title
        id
        author {
          name
        }
        published
        genres

   }


`
export const ALL_BOOKS = gql`
query AllBooks($genre: String) {
  allBooks (genre:$genre){
   ...BookDetails
  }
}
${BOOK_DETAILS}

`
export const BOOK_ADDED = gql`
   subscription {
    bookAdded {
      ...BookDetails
    }
   }
   ${BOOK_DETAILS}

`
export const BOOKS_IN_FAVORITE_GENRE = gql`
  query BooksInFavoriteGenre{
    booksInFavoriteGenre {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
    query {
      allAuthors {
        name
        id
        born
        bookCount

      }
    }


`
export const CREATE_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
  }
}    
`

export const EDIT_AUTHOR= gql`
mutation EditAuthor($name:String!,$setBornTo:Int!) {
    editAuthor(name:$name, setBornTo:$setBornTo) {
      name
      born
    }
  }

`
