import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import {  useQuery, useMutation} from "@apollo/client"
import Notify from "./Notify"
import Select from 'react-select'
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

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [setBornTo, setBorn] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthorBorn, returnResult] =useMutation(EDIT_AUTHOR, {
    refetchQueries:[{query:ALL_AUTHORS}],
    onError: (error)=>{
      const messages = error.graphQLErrors[0].message
      setErrorMessage(messages)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)

    }
  })
  const editAuthor = async (event) => {
    event.preventDefault()
    // const published  =setPublished(Number(published))
    console.log(name)
    editAuthorBorn({variables:{name,setBornTo}})
    console.log('edit author...')

    setName(null)
    setBorn('')

  }

  useEffect(()=>{
    if(returnResult.data && returnResult.data.born === null){
      setErrorMessage('author not found')
    }

  }, [returnResult.data])
  if (!props.show) {
    return null
  }

  if(result.loading){
    return (<div>loading .....</div>)
  }
  if(result.error){
    return (<div>An error occured in the server</div>)
  }


  const authors = result.data.allAuthors
  const authorOptions = authors
  .filter((a) => a.born === null)
  .map((a) => ({
    value: a.name,
    label: a.name,
  }));
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div>
        <h3>Set birthyear</h3>

      </div>
      <form onSubmit={editAuthor}>
        {/* <div>name<input value={name} onChange={({target})=>setName(target.value)} /></div> */}
        <div>
        <Select
            value={authorOptions.find((option) => option.value === name)}
            onChange={(selectedOption) => setName(selectedOption.value)}
            options={authorOptions}
            placeholder="Select an author"
          />
        </div>
        <div>born<input  value={setBornTo} onChange={({target})=>setBorn(Number(target.value))}/></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
