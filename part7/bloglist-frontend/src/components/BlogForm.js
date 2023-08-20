import React from "react"
import { useState } from "react"


// eslint-disable-next-line react/prop-types
const BlogForm = ({handleAddBlog})=>{
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")


    const addBlog = (event) => {
        event.preventDefault()
        handleAddBlog({
            title:title,
            author:author,
            url:url
        })
        setTitle("")
        setAuthor("")
        setUrl("")
    }
    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={addBlog} >
                <div className="form-group">
                    <label htmlFor="title">title:</label>
                    <input 
                    className="form-control"
                    type='text' 
                    id='title'
                    value={title}
                    placeholder="Enter title"
                    onChange={({target}) => setTitle(target.value)}
        
                /></div>
                <div className="form-group">
                <label htmlFor="author">author:</label>
                   
                    <input
                    className="form-control"
                    type='text' 
                    id='author'
                    value={author}
                    placeholder="Enter author"
                    onChange={({target}) => setAuthor(target.value)}
         
                /></div>
                <div className="form-group">
                <label htmlFor="url">url:</label>
                    
                    <input 
                    className="form-control"
                    type='url' 
                    id='url'
                    value={url}
                    placeholder="Enter url"
                    onChange={({target}) => setUrl(target.value)}
        
                /></div>
                <div className="m-2"></div>
                <button id='save-blog-button'className="btn btn-success btn-md m-1" type='submit'>Save</button>


            </form>

        </div>
    )
}


export default BlogForm