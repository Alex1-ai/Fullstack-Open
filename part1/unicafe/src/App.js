
import {useState} from 'react'


const StatisticLine= ({handleClick, text})=>{
 return(
   <>
      <button onClick={handleClick}>
        {text}
      </button>
  </>
 )
}
const Statistics = ({good, neutral, bad})=>{
  if( good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        No Feedback given
      </div>
    )
  }
  return(
    <>
    <div>
      
      <p>good : {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad : {bad}</p>

      <p>all: {good + neutral + bad}</p>

      <p>average: {(good + neutral + bad)/3}</p>
      <p>positive: {((good/(good + neutral + bad)) * 100)}%</p>
    
      </div>
    
    
    </>

  )
  

}
function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = ()=>setGood(good + 1)
  const handleNeutralClick = ()=>setNeutral(neutral + 1)
  const handleBadClick = ()=>setBad(bad + 1)
 
  return (
    <div>
      <h1>give feedback</h1>
      <StatisticLine handleClick={handleGoodClick} text={"good"} />
      <StatisticLine handleClick={handleNeutralClick} text={"neutral"} />
      <StatisticLine handleClick={handleBadClick} text={"bad"} />
      <div>
        
      <h2>
      Statistics
      </h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
       
      </div>
     
    

    </div>
  );
}

export default App;
