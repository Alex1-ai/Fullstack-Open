import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        return action.payload
      case 'HIDE_NOTIFICATION':
        return null;
      default:
        return state;
    }
  };
const NotificationContext = createContext()

export const NotificationContextProvider = (props)=>{
    const [notificationState, notificationDispatch] = useReducer(notificationReducer,null)

    return (
        <NotificationContext.Provider value={[notificationState, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}


export const useNotificationValue = ()=>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = ()=>{
    const notificationAndDispatch= useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext













// import React, { createContext, useContext, useReducer } from 'react';

// const NotificationContext = createContext();

// export const useNotification = () => {
//   return useContext(NotificationContext);
// };

// const notificationReducer = (state, action) => {
//   switch (action.type) {
//     case 'SHOW_NOTIFICATION':
//       return action.message;
//     case 'HIDE_NOTIFICATION':
//       return action.message;
//     default:
//       return state;
//   }
// };

// export const NotificationProvider = ({ children }) => {
//   const [notificationState, dispatch] = useReducer(notificationReducer, null);

//   return (
//     <NotificationContext.Provider value={{ notificationState, dispatch }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };
