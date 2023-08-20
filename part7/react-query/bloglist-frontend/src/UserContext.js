import { createContext, useContext, useReducer } from "react"


const userReducer = (state, action)=>{

    switch(action.type){
        case "SET_USER":
            return action.payload
        
        case "CLEAR_USER":
            return null
        default:
            return null
    }

}


const UserContext = createContext()

export const useUserValue = ()=>{
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[0]
}

export const useUserDispatch  = ()=>{
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[1]
}

export const UserContextProvider =(props)=>{
    const [user, dispatchUser]  = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, dispatchUser]} >
            {props.children}
        </UserContext.Provider>
    )
}