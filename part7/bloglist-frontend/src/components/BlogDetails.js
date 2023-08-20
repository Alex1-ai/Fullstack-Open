import { useDispatch, useSelector } from "react-redux"
import { useParams,Link } from "react-router-dom"
import { addComment, incrementLike, initializeBlog } from "../reducers/blogReducer"
import { useEffect, useState } from 'react'
import { setNotification } from "../reducers/notificationReducer"
import blogService from "../services/blogs"

const BlogDetails=()=>{
    const [comment , setComment ] = useState('')
    // const [commentList, setCommentList] = useState([])

    const id = useParams().id
    const dispatch = useDispatch()
    useEffect(()=>{


        dispatch(
            
            initializeBlog()
            
            
            
            )
    
      },[dispatch])
    
    // const user  =  useSelector(state=>state.user)
    let blog = useSelector(state=>{
        const blog = state.blogs.filter(blog => blog.id === id)
        // console.log("sorted ",sortedBlogs)
        return blog[0]
    })
    console.log(blog && blog, "Empty")
    let commentList = blog && blog.comments

    // if (blog.length)/

    const handleUpdateLikes = () =>{
        console.log(blog.id)
        const likes = blog.likes + 1
        console.log(likes)
        const updateLikes = {
            ...blog,
            likes: likes
        }
        console.log("Here",updateLikes)
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

    const handleComment =async(event)=>{

        event.preventDefault()
        console.log(" comments ", comment)

        try{
            // const sendComment = await blogService.createComment(id,{
            //     "content":comment
            // })
            // console.log("comment ", sendComment)
            // commentList = [...commentList, sendComment]
            // console.log("after comment", commentList)
            dispatch(addComment(id,{"content":comment}))
            dispatch(setNotification({message:`${comment} added successfully`, success:true},50000))
            // window.localStorage.setItem(
            //     "loggedBLogappUser", JSON.stringify(user)
            // )
            // blogService.setToken(user.token)
            // dispatch(setUser(user))
            setComment("")
            // setPassword("")
        }catch (exception) {
            dispatch(setNotification({message:`${exception}`, success:false},50000))
           
        }

    }



    return (
        <>

        <h2>{blog && blog.title}</h2>

        <Link >{blog && blog.url}</Link>
        <br/>

        {blog && blog.likes} likes <button className="btn btn-outline-success btn-sm" onClick={handleUpdateLikes}>like</button><br/>

        added by {blog && blog.user.username}
        
        <h3>comments </h3>
        <form onSubmit={handleComment}>
            <div className="form-group">
            <input className="form-control" type="text" name="comment" value={comment} id="comment" onChange={({target})=>setComment(target.value)}/><button className="btn btn-info m-1" type="submit">add comment</button>
            </div>
        </form>


        <ul>
            {
                blog && blog.comments.map(com=><li key={com._id}>{com.content}</li>)
                
            }
        </ul>
        </>
    )
}




export default BlogDetails