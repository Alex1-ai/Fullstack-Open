import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setUser, signOut } from "../reducers/userReducer"
import ErrorNotification from "./ErrorNotification"
import SuccessNotification from "./SuccessNotification"
import HomePage from './HomePage'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'

import UserBlogDetails from './UserBlogDetails'
import UsersList from './UsersList'
import BlogDetails from './BlogDetails'
import LoginForm from './LoginForm'
const Display = () =>{

    const dispatch= useDispatch()
    useEffect(()=>{
        const loggedUserJSON = window.localStorage.getItem("loggedBLogappUser")
        // console.log(loggedUserJSON)
        if (loggedUserJSON){
            // console.log("got a blog")
            const user = JSON.parse(loggedUserJSON)
            // console.log("user ",user)
            dispatch(setUser(user))
            // setUser(user)
            // blogService.setToken(user.token)
        }
        // console.log("Notthing found")

    },[])
    const user = useSelector(state=>{
        // console.log(state.user)
        return state.user
    })
    if (user === null){
        return (
            <div>
                
                <LoginForm />
        
            </div>
        )
    }

    const logout = () => {
        // window.localStorage.removeItem("loggedBLogappUser")
        dispatch(signOut())
        // setUsername("")
        // setPassword("")

    }
    const padding = {
        padding:5
    }
    return (
        <div className='container-fluid'>
            <Router>
            <>
            <nav className="navbar navbar-inverse nav navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <div className="navbar-header">
                <Link className="navbar-brand" to="/">Alexis</Link>
                </div>
                <ul className="nav navbar navbar-expand-lg navbar-dark bg-primary">
                <div className=''>
                <Link style={padding} className='text-white' to="/">blogs</Link>
                <Link style={padding} className='text-white' to="/users">users</Link>
                </div>
                </ul>
                <button className='btn  btn-outline-danger btn-sm' id="logout" onClick={logout}>logout</button>
            </div>
            </nav>
            {/* <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
                <Link style={padding} className='text-white' to="/">blogs</Link>
                <Link style={padding} className='text-white' to="/users">users</Link>
                { user && <>{user.name} logged in <button className='btn  btn-outline-danger btn-sm' id="logout" onClick={logout}>logout</button></> }
            </div> */}
            
            <h2>Blogs</h2>
                <ErrorNotification  />
                <SuccessNotification />
            
            
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/users" element={<UsersList />}/>
                <Route path="/users/:id" element={<UserBlogDetails />}/>
                <Route path="/blogs/:id" element={<BlogDetails />}/>
            </Routes>
            
            
            
            
            
            </>
            </Router>
        </div>
    )
}




export default Display