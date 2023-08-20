import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
     useParams
} from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const UserBlogDetails = ()=>{
    const dispatch = useDispatch()
    const id = useParams().id

    useEffect(()=>{


        dispatch(
            
            initializeUsers()
            
            
            
            )
    
      },[dispatch])

      
    const users = useSelector(state=>{
        // console.log("userDetails Done ",state.users)
        return state.users
    })
    // console.log("Id ",id)
    
    const userAndBlogs = users && users.filter(user=>user.id === id)[0]
    // const userBlogs = 
    // console.log("THe user blog ", userAndBlogs)

    
    





    return (

        <>
        

        <h2>{userAndBlogs && userAndBlogs.name} {userAndBlogs && userAndBlogs.username}</h2>

        <h3>added blogs</h3>

        <ul>

            {userAndBlogs &&
                userAndBlogs.blogs.map(
                blog=><li key={blog.id}>{blog.title}</li>
                
                )
            }
        </ul>
        
        
        </>
    )
}




export default UserBlogDetails