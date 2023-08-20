import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { initializeUsers } from "../reducers/usersReducer"
import User from "./User"


const UsersList = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{


        dispatch(
            
            initializeUsers()
            
            
            
            )
    
      },[dispatch])
    const users = useSelector(state=>{
        console.log("users Done ",state.users)
        return state.users
    })


    const padding = {
        paddingLeft:150
    }
    

    return (

        <>
         <h2> Users</h2>

         <div>
            <h3 style={padding}>blogs created</h3>
            {users && users.map(user =>{
                // console.log(user)
                return (
                <table key={user.id} className="table table-striped">
                    <tbody>
                    <tr>
                      <td key={user.id} ><User key={user.id} id={user.id} username={user.username} name={user.name} blogLength={user.blogs.length}/></td>
                    </tr>
                    </tbody>
                </table>
                )
            })}

         </div>
        
        </>
    )
}



export default UsersList