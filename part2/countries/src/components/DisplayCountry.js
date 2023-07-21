
import React, { useEffect, useState } from 'react';
import axios from "axios";
import DisplayWeather from "./DisplayWeather";
// import dotenv from "dotenv";
// dotenv.load();
const DisplayCountry = ({country})=>{
    
    country = JSON.parse(country)
    // const countryName = country.name.common
    const capitalCity = country.capital[0]
    // console.log("sammy ",country.capital[0])
    const [weather, setWeather] = useState([]);
    
    const API_KEY=process.env.REACT_APP_API_KEY;

   
    useEffect( ()=>{
      console.log("effect run, search country is now set")
      const city = capitalCity
      
      // if(countries){
        console.log('fetching countries ....')
        axios 
          //  .get(`${baseUrl}/name/${userInput}`)
          .get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=${API_KEY}`)
           .then(response=>{
            console.log('weather ',response.data)
            
            setWeather(response.data)
            console.log(weather.weather[0].icon)
            
           })
           .catch(error=>console.log(error.message))
          if(weather.length !== 0){
              console.log("weather",weather)
          }
  
          
  
          // console.log(countries.length)
      // }
    },[]
    )
       
       return (
            <div>
                <h2>{ country.name? country.name['common'] :''}</h2>


                <p>{country.capital? country.capital: ''}</p>
                <p>Area :{country.area? country.area: ''}</p>



                <h4>Languages:</h4>
                <ul>
                    
                        
                         {country.languages &&
                           Object.values(country.languages).map((language, id) => (
                             <li key={id}>{language}</li>
                           ))}
                       
                    
                </ul>

                {country.flags &&
                  <img src={country.flags.png} alt={country.flags.alt}
                   />                
                }
                <DisplayWeather weather={weather} />
               
                


            </div>

            

            ) 

       
            



    
           
}




export default DisplayCountry