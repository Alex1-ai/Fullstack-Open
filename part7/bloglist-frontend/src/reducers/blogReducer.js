import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";


const blogSlice = createSlice({
    name: "blog",
    initialState:[],
    reducers:{
        
        update: (state, action)=>{
            const updatedBlog = action.payload


            
           return state.map(blog=>blog.id !== updatedBlog.id? blog: updatedBlog)
        },
        remove:(state, action)=>{
            const blogId= action.payload
            return state.filter(blog=>blog.id !== blogId)
        },
        appendBlog(state, action){
            state.push(action.payload)
        },

        setBlogs(state, action){
            return action.payload
        }
    }





})

export const {remove, update, setBlogs, appendBlog }  = blogSlice.actions



export const initializeBlog=()=>{
    return async dispatch=>{
        const blogs = await blogService.getAll()
        // console.log("initialblogs", blogs)
        dispatch(setBlogs(blogs))
    }
}
export const addComment=(id, comment)=>{
    return async dispatch=>{
        // console.log(updatedObj)
        const updatedBlog = await blogService.createComment(id,comment)
        // console.log("returned blog ", updatedBlog)
        dispatch(update(updatedBlog))

    }
}

export const incrementLike=(updatedObj)=>{
    return async dispatch=>{
        // console.log(updatedObj)
        const updatedBlog = await blogService.update(updatedObj.id,updatedObj)
        // console.log("returned blog ", updatedBlog)
        dispatch(update(updatedBlog))

    }
}

export const removeBlog=(blogId)=>{
    return async dispatch =>{
        // console.log(blogId)
        const deletedBlog = await blogService.remove(blogId)
        // console.log("deleted ",deletedBlog)
        dispatch(remove(blogId))
        // dispatch()
    }
}
export const createBlog=blogObject=>{
    return async dispatch=>{
        const newBlog = await blogService.create(blogObject)
        dispatch(appendBlog(newBlog))
                // .then(returnedBlog=>{
                //     setBlogs(blogs.concat({...returnedBlog, user}))
        
                //     // setSucessMessage(`a  new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                //     console.log("Hello here is the dispatch")
                //     dispatch(setNotification({message:`a  new blog ${returnedBlog.title} by ${returnedBlog.author} added`, success:true}, 5000))
                //     // setTimeout(() =>{
                //     //     setSucessMessage(null)
                //     // },50000)
                // })
    }
}



export default blogSlice.reducer