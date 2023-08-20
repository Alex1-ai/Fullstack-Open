import React from "react"
// import { useState, useEffect, useRef } from "react"
// import loginService from "./services/login"
// import ErrorNotification from "./components/ErrorNotification"
// import SucessNotification from "./components/SuccessNotification"
// import LoginForm from "./components/LoginForm"
// import BlogForm from "./components/BlogForm"
// import Togglable from "./components/Togglable"
// import { useDispatch, useSelector } from "react-redux"
// import { setUser, signOut } from "./reducers/userReducer"
// import { setNotification } from "./reducers/notificationReducer"
// import { createBlog, incrementLike, initializeBlog, removeBlog } from './reducers/blogReducer';
// import BlogList from "./components/BlogList"
// import ShowBlogForm from "./components/ShowBlogForm"
import Display from "./components/Display"
const App = () => {
    // const dispatch = useDispatch()
    // const [blogs, setBlogs] = useState([])
    // const [user , setUser] = useState(null)
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
   
  

    // const blogFormRef = useRef()
    
    // useEffect(()=>{


    //     dispatch(
            
    //         initializeBlog()
            
            
            
    //         )
    
    //   },[dispatch])
      
      
    // useEffect(() => {
    //     blogService.getAll().then(blogs =>{
    //         const sortedBlogs = blogs.sort((a,b) => b.likes-a.likes)
    //         setBlogs( sortedBlogs )
    //     }
      
    //     )  
    // }, [])
    // let blogs = useSelector(state=>{
    //     const sortedBlogs = [...state.blogs].sort((a,b) => b.likes-a.likes)
    //     // console.log("sorted ",sortedBlogs)
    //     return sortedBlogs
    // })

    // useEffect(()=>{
    //     const loggedUserJSON = window.localStorage.getItem("loggedBLogappUser")
    //     // console.log(loggedUserJSON)
    //     if (loggedUserJSON){
    //         // console.log("got a blog")
    //         const user = JSON.parse(loggedUserJSON)
    //         console.log("user ",user)
    //         dispatch(setUser(user))
    //         // setUser(user)
    //         // blogService.setToken(user.token)
    //     }
    //     // console.log("Notthing found")

    // },[])
    // const user = useSelector(state=>state.user)
    // const handleLogin = async(event) => {
    //     event.preventDefault()
    //     console.log("Logging in with", username, password)
    //     try{
    //         const user = await loginService.login({
    //             username, password
    //         })
    //         window.localStorage.setItem(
    //             "loggedBLogappUser", JSON.stringify(user)
    //         )
    //         // blogService.setToken(user.token)
    //         dispatch(setUser(user))
    //         setUsername("")
    //         setPassword("")
    //     }catch (exception) {
    //         dispatch(setNotification({message:"Wrong username or password", success:false},5000))
           
    //     }
  
    // }

    // const logout = () => {
    //     // window.localStorage.removeItem("loggedBLogappUser")
    //     dispatch(signOut())
    //     // setUsername("")
    //     // setPassword("")

    // }
    // const handleAddBlog = (blogObject)=>{
    //     blogFormRef.current.toggleVisibility()
    //     try{
    //         dispatch(createBlog(blogObject))
    //         dispatch(setNotification({message:`a  new blog ${blogObject.title} by ${blogObject.author} added`, success:true}, 5000))

    //         // blogService.create(blogObject)
    //         //     .then(returnedBlog=>{
    //         //         setBlogs(blogs.concat({...returnedBlog, user}))
        
    //         //         console.log("Hello here is the dispatch")
    //         //         dispatch(setNotification({message:`a  new blog ${returnedBlog.title} by ${returnedBlog.author} added`, success:true}, 5000))
                   
    //         //     })
      

    //     }catch (exception) {
    //         dispatch(setNotification({message:exception, success:false},5000))
            
    //     }



    

    // }

    // const handleRemoveBlog = (blogObject) =>{
    //     const blogId = blogObject.id
    //     if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){
    //         // console.log("Yes")
    //         try{
    //             dispatch(removeBlog(blogId))
    //             // console.log(blogId)

                 
    //             // blogService.remove(blogId)
    //             // // eslint-disable-next-line no-unused-vars
    //             //     .then(_=>{
    //             //         const updatedBlog=blogs.filter(blog=>blog.id !== blogId)
    //             //         setBlogs(updatedBlog)
    //             //     }
        

    //             //     ).catch(error=>{
    //             //         // console.log("Tis is the error", error)
    //             //         dispatch(setNotification({message:`${error.message} unAuthorize: blog does not belong to you`, success:false},5000))
                        

    //             //     })
    //         }catch (exception) {
    //             dispatch(setNotification({message:"Blog not found", success:false},5000))
                

    //         }
    //     }

    // }

    // const handleUpdateLikes = (blogObject) =>{
    //     console.log(blogObject.id)
    //     const likes = blogObject.likes + 1
    //     console.log(likes)
    //     const updateLikes = {
    //         ...blogObject,
    //         likes: likes
    //     }
    //     console.log("Here",updateLikes)
    //     try{
    //         dispatch(incrementLike(updateLikes))
    //         dispatch(setNotification({message:`Thanks for liking '${updateLikes.title}'`, success:true},5000))
    //         // blogService.update(blogObject.id,updateLikes)
    //         //     .then(returnedBlog=>{
    //         //         console.log("returned", returnedBlog)
    //         //         setBlogs([...blogs,returnedBlog])
    //         //         // Update the state with the updated blog returned from the server
    //         //         const updatedBlogs = blogs.map((blog) =>
    //         //             blog.id === returnedBlog.id ? returnedBlog : blog
    //         //         )
    //         //         setBlogs(updatedBlogs)

    //         //         // setSucessMessage(`Likes updated`)
    //         //         // setTimeout(() =>{
    //         //         //   setSucessMessage(null)
    //         //         // },50000)
    //         //     })

    //     }catch (exception) {
    //         dispatch(setNotification({message:exception, success:false},5000))
    //         // setErrorMessage({message:exception, success:false})
    //         // setTimeout(() =>{
    //         //     setErrorMessage(null)
    //         // },50000)
    //     }


    // }
    // if (user === null){
    //     return (
    //         <div>
    //             {/* <ErrorNotification  /> */}
    //             {/* <ErrorNotification message={errorMessage} /> */}
                
    //             {/* <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} /> */}
    //              <LoginForm />
    //         </div>
    //     )
    // }

    // const displayBlogs = () =>{
    //   return (
    //     <>
    //     {blogs.map(blog =>
    //       <Blog key={blog.id} blog={blog} updateBlog={handleUpdateLikes} />
    //     )}
      
    //     </>
    //   )

    // }


    // const blogForm = () =>{
    // // const hideWhenVisible = {display: blogFormVisible? "none": ""}
    // // const showWhenVisible = {display: blogFormVisible? "":"none"}
    //     return (
    //         <Togglable buttonLabel="create new blog " ref={blogFormRef}>
    //             <BlogForm 
          
    //                 handleAddBlog={handleAddBlog} />

    //         </Togglable>
   
      
    //     )
    // }
    return (
        <div>
            {/* <h2>blogs</h2>
            <ErrorNotification  />
            <SucessNotification />
            <div>{user.name} logged in <button id="logout" onClick={logout}>logout</button></div>
            {/* {blogForm()} */}
            {/* <ShowBlogForm /> */}
            {/* {blogs.map(blog =>
                <Blog key={blog.id} username={user.username} blog={blog} updateBlog={()=>handleUpdateLikes(blog)} handleRemoveBlog={()=>handleRemoveBlog(blog)} />
            )}
            <h3>Component</h3> 
            <BlogList /> */}

            <Display />
        </div>
    )
}

export default App