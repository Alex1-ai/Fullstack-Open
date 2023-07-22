const InputSection = ({userInput, handleChange})=>{
    return (
        <div>


         find countries : 
        <input value={userInput === null? '':userInput} onChange={handleChange} />
        </div>
    )
}


export default InputSection