import { Link } from 'react-router-dom'
import React from 'react'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            {/* <a href='#' style={padding}>anecdotes</a>
        <a href='#' style={padding}>create new</a>
        <a href='#' style={padding}>about</a> */}
            <Link to='/' style={padding}>anecdotes</Link>
       
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
        </div>
    )
}

  
export default Menu