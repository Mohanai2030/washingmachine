import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './login.css'
import axios from 'axios'
import useAuth from '../../wrappers/AuthContext/useAuth'
import  useProfile  from '../../wrappers/profilecontext/useProfile'

export default function Login(){
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [role,setRole] = useState('customer')
    const {auth,setAuth} = useAuth();
    const {profile,setProfile} = useProfile();
    const navigate = useNavigate();

    function handleSubmit(){
        let requestBody = {
            'role':role,
            'name':username,
            'password':password
        }
        axios.post('/api/login',requestBody)
        .then(res => {console.log(res);setAuth(res.data.authData);setProfile(res.data.profileData);navigate('/')})
        .catch(err => console.log(err))
    }

    return(
        <div className='loginContainer'>
            <div className='loginSubContainer'>
                <div className='loginHeader'>
                    <div>
                        <img src="../../../public/images/Laundrylogo.png" alt="" height='80px' width='120px'/>
                        <h1>Tidy Laundry</h1>
                    </div>                    
                </div>
                <div>
                        <h2>
                            Welcome Back
                        </h2>
                </div>
                <div className='loginBody'>

                    <div>
                        <label htmlFor="">Login as</label>
                        <select name="" id="" value={role}onChange={(e)=>{setRole(e.target.value)}}>                       
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
    
                        </select>
                    </div>


                    <div>
                        <label htmlFor="">Username</label>
                        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username'/>
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
                    </div>

                </div>

                <div className='loginFooter'>
                    <div>
                        <button className='loginSubmitButton' onClick={handleSubmit}>
                            Login
                        </button>
                    </div>
                    
                    <div>
                        Don't have an account?
                        
                        <Link to='/signup'>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}