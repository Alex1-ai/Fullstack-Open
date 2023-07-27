import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
// import axios from 'axios'
import numService from './services/contactApi'
import Notification from './components/Notification'


const App =()=> {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // const hook=() =>{
  //   console.log("effect")

  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response=>{
  //       console.log("promise fulfilled")
  //       setPersons(response.data)
  //     })

  // }
  useEffect(()=>{
    numService.getAll()
    .then(initialNum=>
      setPersons(initialNum)
    

    )
    
  }
    ,[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord]  = useState('')
  const [message, setMessage]= useState('')
  const [notifyStyle, setNotifyStyle] = useState('')
  


  const addPerson = (event)=>{
    event.preventDefault()
    const personExist =persons
    .find(person=>person.name===newName)
    // const personNumExist= persons.find(person=>person.number===newNumber)
    if(personExist){
          // console.log("Start")
          // alert(`${newName} already added to phonebook`)
          // console.log(`${newName} already added to phonebook`)     
          alert(`${newName} already added to phonebook`)
    }else{
          // console.log("end")

          const personObject = {
            name: newName,
            number:newNumber
          }
          // console.log("before ",persons)
          // setPersons(
          //   persons.concat(personObject)
          // )
          numService
               .create(personObject)
               .then(returnedPerson=>{
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setMessage(`Added ${newName}`)
                setNotifyStyle('success')

                setTimeout(()=>{
                  setMessage(null)
                  setNotifyStyle('')
                }, 5000)
               }).catch((err) => {
                // setMessage(err.response.data.error)
                console.log(err.response.data)
                setMessage(err.response.data.error)
                setNotifyStyle('error')

                setTimeout(() => {
                  setMessage(null)
                  setNotifyStyle('')
                }, 5000)
              })
          


          // SETTING THE NOTIFICATION
          
           
          // axios
          //   .post('http://localhost:3001/persons', personObject)
          //   .then(response=>{
          //     console.log(response.data)
          //     setPersons(persons.concat(response.data))
          //     setNewName('')
          //     setNewNumber('')
          //   })
          
          // console.log("after ",persons)
      
      // console.log(event.target)

    }  
  }
  const handleRemove =(id)=>{
    const personToBeRemoved =persons.find(person=>person.id===id).name
    const answer = window.confirm(
      `Delete ${personToBeRemoved}`
    )
    //console.log(answer)
    if(answer){
      return numService.remove(id)
      .then(setPersons(
        persons
        .filter(person=>person.id!==id)
        )


      ).catch(
        error=>{
          setMessage(
            `Information of ${personToBeRemoved} has already been removed from server`
          )
          setNotifyStyle('error')

          setPersons(persons.filter(person=>person.id !== id))

          setTimeout(()=>{
            setMessage(null)
            setNotifyStyle('')
          }, 5000)
          

         
        }
      )


      

    }
    

  }
  const handleNumberChange = (e)=>{
    setNewNumber(e.target.value)
  }

  const handleNameChange = (e)=>{
    // console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleSearch= (e)=>{
    setSearchWord(e.target.value)
    // console.log(searchWord)
    // console.log(e.target.value)

  }

  const filteredPerson = persons.filter(person=>person.name.toLowerCase().includes(searchWord.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      
      
      <Notification message={message} styleName={notifyStyle}/>

      <Filter searchWord={searchWord} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      addPerson={addPerson}/>
       
      

      <h2>Numbers</h2>
      {
        filteredPerson.map(person=><Person key={person.id} person={person} handleDelete={()=>handleRemove(person.id)} />)
      }
      {/* <Persons
       filteredPerson={filteredPerson}
       handleDelete={handleRemove}
       /> */}
      
      
    </div>
  );
}

export default App;
