import React from "react"
import {useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display:visible? "none":""}
    const showWhenVisible = {display:visible?  "":"none"}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
     
    useImperativeHandle(refs, ()=>{
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <div style={hideWhenVisible}>

                <button id='blog-button' className="btn btn-warning btn-md" onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} >
                {props.children}
                <button onClick={toggleVisibility} className='togglableContent btn btn-danger btn-md mb-1'>cancel</button>
            </div>
        </div>
    )
}
)

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Togglable