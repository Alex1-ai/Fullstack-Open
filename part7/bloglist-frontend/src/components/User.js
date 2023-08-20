import {
    
     Link
} from 'react-router-dom'



const User = ({username,name, id, blogLength})=>{
    // console.log(props)
    const padding={
        paddingLeft:60

    }

    return (
        <>
          
          
          
          <Link to={`/users/${id}`} >{username} {name} </Link> 
          <span style={padding}>  { blogLength}</span>
         
          
        
        </>
    )
}




export default User