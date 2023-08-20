import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"


const SuccessNotification = ()=>{
    const message = useSelector(state=>state.notification)
    // console.log("success ",message)
    if(message === null){
        return null
    }

    if(message.success === false){
        return null
    }
    return (
        <div className="success">
            {message.message}
        </div>
    )
}


SuccessNotification.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
    ]),
}
// SuccessNotification.propTypes = {
  
//     message: PropTypes.string.isRequired,
//     // user: PropTypes
// }

export default SuccessNotification