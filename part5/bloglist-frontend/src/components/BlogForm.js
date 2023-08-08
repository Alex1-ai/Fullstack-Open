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
                <div>title:<input 
                    type='text' 
                    id='title'
                    value={title}
                    placeholder="Enter title"
                    onChange={({target}) => setTitle(target.value)}
        
                /></div>
                <div>author:<input
                    type='text' 
                    id='author'
                    value={author}
                    placeholder="Enter author"
                    onChange={({target}) => setAuthor(target.value)}
         
                /></div>
                <div>url:<input 
                    type='text' 
                    id='url'
                    value={url}
                    placeholder="Enter url"
                    onChange={({target}) => setUrl(target.value)}
        
                /></div>
                <button id='save-blog-button' type='submit'>Save</button>


            </form>

        </div>
    )
}


export default BlogForm