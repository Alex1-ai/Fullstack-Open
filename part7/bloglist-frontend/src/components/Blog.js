import React from "react"
import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
const Blog = ({blog, username, updateBlog, handleRemoveBlog}) => {
    // console.log(blog)
    const [view , setView] = useState(false)
  
    const blogStyle = {
        paddingTop: 10,
        paddingLeft:2,
        border: "solid",
        borderWidth:1,
        marginBottom:5
    }
    const removeButtonStyle ={
        backgroundColor:"blue",
        borderRadius:"5px",
        border:"none",
        padding:"4px"
    }
    return(
        <div className="blog" style={blogStyle}>
           <Link to={`/blogs/${blog.id}`}>  {blog.title} {blog.author} </Link>
            {/* <button id="view-button" onClick={()=>setView(!view)}>
                {view === true? "hide":"view"}
            </button> */}
            { view && (
                <div>
                    <div>{blog.url}</div>
                    <div>Likes :{blog.likes} <button className="btn" onClick={updateBlog}>like</button></div>

                    <div>{blog.user === undefined ? "":blog.user.name}</div>
                    {
                        <>
                            {/* {console.log(blog.user)}
                            {console.log(username)} */}
                            {
                                blog.user.username !== username ?
                                    ""
                                    :  <button id="remove-button" style={removeButtonStyle} onClick={handleRemoveBlog}>delete</button>

                            }
                        </>
                        
                        
                    }

                  
      
    
                </div>
   
            )}
    
        </div>  
    )
}
Blog.propTypes = {
  
    blog: PropTypes.object.isRequired,
    // user: PropTypes
}
export default Blog