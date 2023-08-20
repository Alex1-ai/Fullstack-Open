    
import axios from "axios"
const baseUrl = "/api/users"



const getAll = () => {
    const request = axios.get(baseUrl)
    // console.log(request.)
    return request.then(response => {
        // console.log("Inside user ",response.data)
        return response.data
    })
}






export default { getAll }
