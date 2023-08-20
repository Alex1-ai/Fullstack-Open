import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action)=>{
    switch(action.type){
        case 'SHOW_NOTIFICATION':
            // console.log("inside the app  ",action.payload)
            return action.payload
        
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
        
            // return action.payload
    }

}


const NotificationContext = createContext()

export const useNotificationValue=()=>{
    const notificationandDispatch = useContext(NotificationContext)
    return notificationandDispatch[0]
}

export const useNotificationDispatch = ()=>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}
export const NotificationContextProvider = (props)=>{
    const [notification, notificationDispatch] = useReducer(notificationReducer,null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}




export default NotificationContext