import { useState } from 'react'
const Button = ({handleClick, text})=>{
  return (
   
      <button onClick={handleClick}>
        {text}
      </button>
   
  )
}

// const AnecdoteDisplay = ({handleClick , handleVote,points, anecdotes, textVote,textNext})=>{
//   return (
//     <div>
//       <p>{anecdotes[selected]} has {points[3]} votes</p>
//       <Button handleClick={handleVote} text={textVote}  />
//       <Button handleClick={handleClick} text={textNext} />

//         {/* <button onClick={handleClick}>
//             {text}
//         </button> */}
//     </div>
//   )
// }
const AnecdoteMostVote = ({highestVoteAnecdote, highestVote})=>{
  // console.log(highestVoteAnecdote)
  
  
  if(!(highestVote === 0)){
        return (
          
          <div>
            <h2>Anecdote with most votes</h2>
            <p>{highestVoteAnecdote}</p>
          </div>

                    )
  }
  
 return (
  <div>
      <h2>Anecdote with most votes</h2>
    None Yet.....
  </div>
 )

}

const AnecdoteOfTheDay = ({anecdotes, selected, handleClick,points, handleVote,textClick,textVote})=>{
  return (
    <div>
      <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]}</p>
        <Button handleClick={handleVote} text={textVote} />
        <Button handleClick={handleClick} text={textClick} />
        
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
//  const points = {
//   0:2,1:4,2:8,3:1,
//   4:8,5:3,6:5,7:9
//  }
  // let randomNumber
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const highestVote = Math.max(...points)
  const highestVoteAnecdote =anecdotes[points.indexOf(highestVote)]
  const textButtonAnecdote = "next anecdote"
  const textButtonVote = "Vote"
  // console.log(highestVoteAnecdote)
  const handleClick=()=>{
    // console.log(selected)
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
   
    // console.log("random", randomNumber)
    //selected = randomNumber
    //points[randomNumber] +=1 
    // console.log(points)
    
    setSelected( randomNumber)
  }
  const handleVote = ()=>{
    // /console.log(points)
    const newVotes = [...points]
    // console.log(typeof(selected))
    
    newVotes[selected] += 1
    
    // console.log(newVotes)
    setPoints(newVotes)
  }
  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} selected={selected} points={points}
      handleClick={handleClick} handleVote={handleVote}
      textClick={textButtonAnecdote}  textVote={textButtonVote} />
      {/* <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} has {points[selected]} votes</p>
      <Button handleClick={handleVote} text={"Vote"}  />
      <Button handleClick={handleClick} text={"next anecdote"} />
       */}
      
      <AnecdoteMostVote highestVoteAnecdote={highestVoteAnecdote} highestVote={highestVote} />

    </div>
  )
}

export default App

