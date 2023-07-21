
const DisplayCountries = ({country, handleClick})=>{
    country = JSON.parse(country)
    // console.log('spider ',country.name.common)
   
            return (

                <div>

                <div >{ country.name? country['name'].common:""}
                <button onClick={handleClick}>show</button>
                {/* <button onClick={handleButtonClick}>show</button> */}
                
                </div>
                </div>

            )
   
           
}




export default DisplayCountries