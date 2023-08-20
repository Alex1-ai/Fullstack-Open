import {  useRef } from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"




const ShowBlogForm = ()=>{
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const handleAddBlog = (blogObject)=>{
        blogFormRef.current.toggleVisibility()
        try{
            dispatch(createBlog(blogObject))
            dispatch(setNotification({message:`a  new blog ${blogObject.title} by ${blogObject.author} added`, success:true}, 5000))

            // blogService.create(blogObject)
            //     .then(returnedBlog=>{
            //         setBlogs(blogs.concat({...returnedBlog, user}))
        
            //         console.log("Hello here is the dispatch")
            //         dispatch(setNotification({message:`a  new blog ${returnedBlog.title} by ${returnedBlog.author} added`, success:true}, 5000))
                   
            //     })
      

        }catch (exception) {
            dispatch(setNotification({message:exception, success:false},5000))
            
        }



    

    }
    

    return (
        <>
        
            <Togglable buttonLabel="create new blog " ref={blogFormRef}>
                <BlogForm 
          
                    handleAddBlog={handleAddBlog} />

            </Togglable>
   
      
    
        
        
        
        </>
    )
}



export default ShowBlogForm