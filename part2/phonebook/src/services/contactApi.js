import axios from 'axios'

const baseUrl = '/api/persons'


const getAll = ()=>{
    const request= axios
    .get(baseUrl)
   return request.then(response=>response.data)
            
               
}


const create = newObj =>{
    const request = axios.post(baseUrl, newObj)
    return request.then(response=>response.data)
               
}

const remove = id=>{
    // console.log(id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}


export default{
    getAll,
    create,
    remove

}