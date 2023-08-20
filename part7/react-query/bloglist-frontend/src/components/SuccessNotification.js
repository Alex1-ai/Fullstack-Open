import React from "react"
import PropTypes from "prop-types"
import { useNotificationValue } from "../NotificationContext"



const SuccessNotification = ()=>{
    const message = useNotificationValue()
    console.log("success ",message)
    if(message === null){
        return null
    }

    if(message.success === false){
        return null
    }
    return (
        <>
         {
            message ==null? "":<div className="success">
            {message.message}
        </div>
         } 
        
        </>
        
    )
}
SuccessNotification.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null]),
    ]),
}

export default SuccessNotification