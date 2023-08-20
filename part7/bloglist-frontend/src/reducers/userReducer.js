import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs";


const userReducer= createSlice({
    name:'user',
    initialState: null,
    reducers:{


        user:(state,action)=>{
            return action.payload
        },
        clearUser:()=>null
    }
})



export const { user, clearUser } = userReducer.actions

export const setUser=(loggedInUser)=>{
    // console.log("user ", loggedInUser)
    return (dispatch)=>{
        blogService.setToken(loggedInUser.token)
        dispatch(user(loggedInUser))
    }

}


export const signOut=()=>{
    return (dispatch)=>{
        window.localStorage.removeItem("loggedBLogappUser")
        dispatch(clearUser())
    }
}


export default userReducer.reducer