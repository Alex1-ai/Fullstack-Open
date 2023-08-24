import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"
import Notify from "./Notify"


const LoginForm = ({ show, setToken, setPage}) =>{
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    

    const [ login, result ] = useMutation(LOGIN, {

        onError: (error)=>{
            setErrorMessage(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=>{
        if (result.data ){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('books-user-token', token)
        }
    }, [result.data])
    if (!show) {
        return null
      }
    const submit = async (event) =>{
        event.preventDefault()

        login({variables: {username, password}})
        setUsername('')
        setPassword('')
        setPage('authors')
    }
    return (
        <div>
            <h2>Login</h2>
            <Notify errorMessage={errorMessage}/>
            <form onSubmit={submit}>
                <div>
                    username: <input 
                    type="text"
                     value={username} 
                     onChange={({target})=>setUsername(target.value)}
                     
                     />
                </div>
                <div>
                    password: <input 
                    type="password" 
                    value={password}
                    onChange={({target})=>setPassword(target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm