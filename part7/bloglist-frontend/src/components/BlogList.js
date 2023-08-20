import Blog from "./Blog"
import { useSelector , useDispatch} from "react-redux"
// import ErrorNotification from "./ErrorNotification"
// import LoginForm from "./LoginForm"
// import { useState } from "react"
import { useEffect } from "react"
import { incrementLike, initializeBlog, removeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const BlogList = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{


        dispatch(
            
            initializeBlog()
            
            
            
            )
    
      },[dispatch])
    
    const user  =  useSelector(state=>state.user)
    let blogs = useSelector(state=>{
        const sortedBlogs = [...state.blogs].sort((a,b) => b.likes-a.likes)
        // console.log("sorted ",sortedBlogs)
        return sortedBlogs
    })
    const handleRemoveBlog = (blogObject) =>{
        const blogId = blogObject.id
        if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){
            // console.log("Yes")
            try{
                dispatch(removeBlog(blogId))
            }catch (exception) {
                dispatch(setNotification({message:"Blog not found", success:false},5000))
                

            }
        }

    }
    const handleUpdateLikes = (blogObject) =>{
        console.log(blogObject.id)
        const likes = blogObject.likes + 1
        console.log(likes)
        const updateLikes = {
            ...blogObject,
            likes: likes
        }
        // console.log("Here",updateLikes)
        try{
            dispatch(incrementLike(updateLikes))
            dispatch(setNotification({message:`Thanks for liking '${updateLikes.title}'`, success:true},5000))
            // blogService.update(blogObject.id,updateLikes)
            //     .then(returnedBlog=>{
            //         console.log("returned", returnedBlog)
            //         setBlogs([...blogs,returnedBlog])
            //         // Update the state with the updated blog returned from the server
            //         const updatedBlogs = blogs.map((blog) =>
            //             blog.id === returnedBlog.id ? returnedBlog : blog
            //         )
            //         setBlogs(updatedBlogs)

            //         // setSucessMessage(`Likes updated`)
            //         // setTimeout(() =>{
            //         //   setSucessMessage(null)
            //         // },50000)
            //     })

        }catch (exception) {
            dispatch(setNotification({message:exception, success:false},5000))
            // setErrorMessage({message:exception, success:false})
            // setTimeout(() =>{
            //     setErrorMessage(null)
            // },50000)
        }


    }
    // if (user === null){
    //     return (
    //         <div>
    //             <ErrorNotification  />
    //             {/* <ErrorNotification message={errorMessage} /> */}
    //             <h2>Log in to application</h2>
    //             <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        
    //         </div>
    //     )
    // }
    return (
        <>
          { blogs && blogs.map(blog =>
                <Blog key={blog.id} username={user.username} blog={blog} updateBlog={()=>handleUpdateLikes(blog)} handleRemoveBlog={()=>handleRemoveBlog(blog)} />
            )}
        
        </>
    )
}


export default BlogList