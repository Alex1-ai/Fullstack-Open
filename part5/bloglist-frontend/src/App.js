import React from "react"
import { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import ErrorNotification from "./components/ErrorNotification"
import SucessNotification from "./components/SuccessNotification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user , setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [title, setTitle] = useState('')
    // const [author, setAuthor] = useState('')
    // const [url, setUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSucessMessage] = useState(null)
    // const [blogFormVisible, setBLogFormVisible] = useState(false)
  

    const blogFormRef = useRef()
    useEffect(() => {
        blogService.getAll().then(blogs =>{
            const sortedBlogs = blogs.sort((a,b) => b.likes-a.likes)
            setBlogs( sortedBlogs )
        }
      
        )  
    }, [])


    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem("loggedBLogappUser")
        // console.log(loggedUserJSON)
        if (loggedUserJSON){
            // console.log("got a blog")
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        // console.log("Notthing found")

    },[])

    const handleLogin = async(event) => {
        event.preventDefault()
        console.log("Logging in with", username, password)
        try{
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                "loggedBLogappUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        }catch (exception) {
            setErrorMessage("Wrong username or password")
            setTimeout(() =>{
                setErrorMessage(null)
            },50000)
        }
  
    }

    const logout = () => {
        window.localStorage.removeItem("loggedBLogappUser")
        setUser(null)
        setUsername("")
        setPassword("")

    }
    const handleAddBlog = (blogObject)=>{
        blogFormRef.current.toggleVisibility()
        try{
            blogService.create(blogObject)
                .then(returnedBlog=>{
                    setBlogs(blogs.concat({...returnedBlog, user}))
        
                    setSucessMessage(`a  new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                    setTimeout(() =>{
                        setSucessMessage(null)
                    },50000)
                })
      

        }catch (exception) {
            setErrorMessage(exception)
            setTimeout(() =>{
                setErrorMessage(null)
            },50000)
        }



    

    }

    const handleRemoveBlog = (blogObject) =>{
        const blogId = blogObject.id
        if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){
            // console.log("Yes")
            try{

                // console.log(blogId)


                blogService.remove(blogId)
                // eslint-disable-next-line no-unused-vars
                    .then(_=>{
                        const updatedBlog=blogs.filter(blog=>blog.id !== blogId)
                        setBlogs(updatedBlog)
                    }
        

                    ).catch(error=>{
                        // console.log("Tis is the error", error)
                        setErrorMessage(`${error.message} unAuthorize: blog does not belong to you`)
                        setTimeout(() =>{
                            setErrorMessage(null)
                        },50000)

                    })
            }catch (exception) {
                setErrorMessage("Blog not found")
                setTimeout(() =>{
                    setErrorMessage(null)
                },50000)
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
        console.log("Here",updateLikes)
        try{
            blogService.update(blogObject.id,updateLikes)
                .then(returnedBlog=>{
                    console.log("returned", returnedBlog)
                    setBlogs([...blogs,returnedBlog])
                    // Update the state with the updated blog returned from the server
                    const updatedBlogs = blogs.map((blog) =>
                        blog.id === returnedBlog.id ? returnedBlog : blog
                    )
                    setBlogs(updatedBlogs)
                    // setSucessMessage(`Likes updated`)
                    // setTimeout(() =>{
                    //   setSucessMessage(null)
                    // },50000)
                })

        }catch (exception) {
            setErrorMessage(exception)
            setTimeout(() =>{
                setErrorMessage(null)
            },50000)
        }


    }
    if (user === null){
        return (
            <div>
                <ErrorNotification message={errorMessage} />
                <h2>Log in to application</h2>
                <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        
            </div>
        )
    }

    // const displayBlogs = () =>{
    //   return (
    //     <>
    //     {blogs.map(blog =>
    //       <Blog key={blog.id} blog={blog} updateBlog={handleUpdateLikes} />
    //     )}
      
    //     </>
    //   )

    // }


    const blogForm = () =>{
    // const hideWhenVisible = {display: blogFormVisible? "none": ""}
    // const showWhenVisible = {display: blogFormVisible? "":"none"}
        return (
            <Togglable buttonLabel="create new blog " ref={blogFormRef}>
                <BlogForm 
          
                    handleAddBlog={handleAddBlog} />

            </Togglable>
   
      
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <ErrorNotification message={errorMessage} />
            <SucessNotification message={successMessage} />
            <div>{user.name} logged in <button id="logout" onClick={logout}>logout</button></div>
            {blogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id} username={user.username} blog={blog} updateBlog={()=>handleUpdateLikes(blog)} handleRemoveBlog={()=>handleRemoveBlog(blog)} />
            )}
        </div>
    )
}

export default App