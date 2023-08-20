import React,{useState} from "react"
import { useDispatch } from "react-redux"
// import PropTypes from "prop-types"
import { setNotification } from "../reducers/notificationReducer"
import { setUser } from "../reducers/userReducer"
import loginService from "../services/login"
import ErrorNotification from "./ErrorNotification"
// eslint-disable-next-line react/prop-types
const LoginForm = ()=>{
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async(event) => {
        event.preventDefault()
        // console.log("Logging in with", username, password)
        try{
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                "loggedBLogappUser", JSON.stringify(user)
            )
            // blogService.setToken(user.token)
            dispatch(setUser(user))
            setUsername("")
            setPassword("")
        }catch (exception) {
            dispatch(setNotification({message:"Wrong username or password", success:false},5000))
           
        }
  
    }
    return  (
        <>
        <div className="container">
            <ErrorNotification  />
            <h2 className="text-center">Log in application </h2>
            <div className="formDiv">
                <form onSubmit={handleLogin} >

                    <div className="form-group">
                        <label htmlFor="username" >Username </label>
                        <input
                            className="form-control"
                            type='text' 
                            id='username'
                            value={username}
                            name="Username"
                            onChange={({target}) => setUsername(target.value)}
                
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="password" >Password </label>
                        <input
                            className="form-control"
                            type='password'
                            id='password'
                            value={password}
                            name='password'
                            onChange={({target}) => setPassword(target.value)}
                
                        />
                    </div>
                    <br/>
                    <div className="form-group">

                    <button id='login-button' className="btn btn-primary" type='submit'>login</button>
                    </div>
                </form>
            </div>
        </div>

        </>
    )

}

// LoginForm.propTypes = {
//     username: PropTypes.string.isRequired,
//     password: PropTypes.node.isRequired,
//     setUsername : PropTypes.func.isRequired,
//     setPassword : PropTypes.func.isRequired,
//     handleLogin : PropTypes.func.isRequired
// }

export default  LoginForm 