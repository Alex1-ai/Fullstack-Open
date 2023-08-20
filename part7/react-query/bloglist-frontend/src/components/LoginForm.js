import React from "react"
import PropTypes from "prop-types"
// eslint-disable-next-line react/prop-types
const LoginForm = ({username, password, setUsername,setPassword, handleLogin})=>{

    return  (
        <div className="formDiv">
            <form onSubmit={handleLogin}>
                <div>username 
                    <input
                        type='text' 
                        id='username'
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
            
                    />
                </div>
                <div>password 
                    <input
                        type='password'
                        id='password'
                        value={password}
                        name='password'
                        onChange={({target}) => setPassword(target.value)}
            
                    />
                </div>
                <button id='login-button' type='submit'>login</button>
            </form>
        </div>
    )

}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername : PropTypes.func.isRequired,
    setPassword : PropTypes.func.isRequired,
    handleLogin : PropTypes.func.isRequired
}

export default  LoginForm 