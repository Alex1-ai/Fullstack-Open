import { useState } from "react";
import { ALL_BOOKS } from "../queries"
import { useQuery} from "@apollo/client"
// const ALL_BOOKS = gql`
//     query {
//       allBooks {
//         title
//         author
//         published
//       }
//     }


// `


const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result= useQuery(ALL_BOOKS,{
    variables: {genre: selectedGenre}
  }
  //   ,{
  //   pollInterval:2000
  // }
  
  )
  if (!props.show) {
    return null
  }
  if(result.loading){
    return (<div>loading .....</div>)
  }
  if(result.error){
    console.log(result.error)
    return (<div>An error occured in the server</div>)
  }


  const books = result.data.allBooks

  const genres = Array.from(new Set(books.flatMap((book) => book.genres))); // Get unique genres
  // const filteredBooks = selectedGenre
  //   ? books.filter((book) => book.genres.includes(selectedGenre))
  //   : books;
  // const books = []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* buttons for genre here */}
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{
              background: genre === selectedGenre ? 'lightblue' : 'white',
            }}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books
