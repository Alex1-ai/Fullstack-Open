const { useQuery } = require("@apollo/client");
const { BOOKS_IN_FAVORITE_GENRE } = require("../queries");


const Recommendation = ({show})=>{
    const { loading, error, data } = useQuery(BOOKS_IN_FAVORITE_GENRE);

    if (!show) {
      return null;
    }
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const books = data.booksInFavoriteGenre;


    if (!show) {
        return null
    }

    return (
        <div>
            <h3> recommendation </h3>

            <div>
                <p> books in your favorite genre patterns</p>

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
            </div>
        
        </div>
    )
    
}


export default Recommendation