import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users";


const usersSlice= createSlice({
    name:'users',
    initialState: null,
    reducers:{


        // users:(state,action)=>{
        //     return action.payload
        // },

        setUsers(state, action){
            return action.payload
        }
        
    }
})



export const { setUsers, clearUser } = usersSlice.actions

export const initializeUsers=()=>{
    return async dispatch=>{
        const users = await userService.getAll()
        // console.log("initialUsers", users)
        dispatch(setUsers(users))
    }
}



export default usersSlice.reducer