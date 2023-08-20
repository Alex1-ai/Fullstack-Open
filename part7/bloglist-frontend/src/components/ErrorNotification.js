import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
const ErrorNotification = ()=>{
    const message = useSelector(state=>state.notification)
    // console.log("error ",message)
    if(message === null){
        return null
    }

    if(message.success === true){
        return null
    }
    return (
        <div className="error">
            {message.message}
        </div>
    )
}


ErrorNotification.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
    ]),
}
// ErrorNotification.propTypes = {
  
//     message: PropTypes.string.isRequired,
//     // user: PropTypes
// }


export default ErrorNotification