import React from "react"
import PropTypes from "prop-types"
import { useNotificationValue } from "../NotificationContext"
const ErrorNotification = ()=>{
    const message = useNotificationValue()
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

export default ErrorNotification