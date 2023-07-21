const DisplayWeather =({weather})=>{


    if (weather.length!==0){
    return (
        <div>
            <div>
                  <h3> Weather in  {weather.name}</h3>

                  <p> temperature {weather.main.temp} Celcius</p>

                <div>
                 { weather?

                     <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
                     :
                     "...."
                      
                
                } 
                </div>


                <p>wind {weather.wind.speed} m/s</p>
               
                </div>
        </div>
    )
    }else{
        return (
            "Fetching...."
        )


    }

    
}


export default DisplayWeather