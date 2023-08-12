import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";



const FilterForm = () =>{

    const dispatch = useDispatch()

    const handleChange =(event) =>{
        const filterWord = event.target.value
        console.log(filterWord)
        dispatch(setFilter(filterWord))

    }




    return (
        <>
          filter <input name='filter'
           onChange={handleChange}
      
        />
        
        
        </>
    )
}



export default FilterForm