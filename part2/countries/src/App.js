
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayCountry from './components/DisplayCountry'
import DisplayCountries from './components/DisplayCountries'
import InputSection from './components/InputSection'


function App() {
  const [userInput , setUserInput] = useState('')
  const [countries, setCountries]  = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
  // let filteredCountries = [];
  


  // const getWeatherData = async (city) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=${API_KEY}`
  //     );
  
  //     // Handle the response data
  //     const weatherData = response.data;

  //     console.log("correct ",weatherData);
  //     const weaatherIcon = weatherData
  //     return weaatherIcon

  //     // Now you can extract specific weather information from the 'weatherData' object.
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //   }
  // };
  const displayCountries=(userInput)=>{
    console.log("user input",userInput)
    if(countries.length !== 0 && userInput){
        const display = countries.filter(
          country=>country.name.common.toLowerCase().includes(userInput.toLowerCase())
          )
          
          // console.log(country.name.common.toLowerCase().includes(userInput.toLowerCase()))
        console.log(filteredCountries)
        
        
        setFilteredCountries(display )
    }
  }

  // useEffect(displayCountries(),[userInput])

  useEffect( ()=>{
    console.log("effect run, search country is now set", userInput)
    
    // if(countries){
      console.log('fetching countries ....')
      axios 
        //  .get(`${baseUrl}/name/${userInput}`)
        .get(`${baseUrl}/all`)
         .then(response=>{
          // console.log(response.data)
          setCountries(response.data)
          
         })
         .catch(error=>console.log(error.message))
        // if(countries.length !== 0){
        //     console.log("countries",countries[0].name.common)
        // }

        // getWeatherData('Accra')

        // console.log(countries.length)
    // }
  },[]
  )
  

  const handleChange=(e)=>{
    const input = e.target.value
    // console.log(input)
    setUserInput(input)
    // console.log("userInput",userInput)
    displayCountries(input)
    // console.log("countries ", countries)

    

    //countries.filter(country=>console.log)
    // console.log(userInput)
  }
  const handleClick = (countryClicked)=>{
    console.log("We dey here")
    console.log(countryClicked.name.common)
    const country = filteredCountries.filter(country=>
        country.name.common === countryClicked.name.common
      
      )

    // console.log("country", country)
    setFilteredCountries(country)
    
  
  }
  
  
  return  (
    <div>
      <div>
        <InputSection userInput={userInput} handleChange={handleChange} />
        <div>{filteredCountries.length !==0 ?  
                  filteredCountries.length > 10?
                    'Too many matches specify another filter'
                  :
                        filteredCountries.length === 1?

                                    filteredCountries.map((country)=>
                                    <DisplayCountry 
                                        key={country.name.common} 
                                        country={JSON.stringify(country)}
                                    // city={city}
                                     
                              
                              
                                    />
                                    
                                    
                                    )
                                          
                                    :
                              


                                    // JSON.stringify(filteredCountries,null,0)
                                    filteredCountries.map( (country) =>
                                          <DisplayCountries
                                          key={country.name.common} 
                                          country={JSON.stringify(country)} 
                                          // country={country}
                                          handleClick={()=>handleClick(country)}
                                          
                                          
                                          />)
              
        
        : "Waiting ....."}  </div>
        
       </div>

       

    </div>
  );
}

export default App;
