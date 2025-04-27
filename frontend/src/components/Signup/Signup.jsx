import { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Signup.css'
import axios from 'axios'

export function Signup(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [role,setRole] = useState('customer')
    const animateNextPageRef = useRef({})
    const navigate = useNavigate()

    function handleSubmit(){
        let requestBody = {
            'role':role,
            'name':username,
            'password':password,
            'email':email,
            'phone':phone
        }
        axios.post('/api/signup',requestBody)
        .then((res)=>{
            console.log(res);
            navigate('/login')
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handleNextSignupPage(){
        console.log('clcik event',animateNextPageRef.current.classList);
        let classList = Array.from(animateNextPageRef.current.classList)
        if(classList.includes('right')){
            animateNextPageRef.current.classList.remove('right')
        }else{
            animateNextPageRef.current.classList.add('right')
        }
    }

    return(
        <div className='signupContainer'>
            <div className='signupSubContainer'>
                <div className='signupHeader'>
                    <div>
                        <img src="../../../public/images/Laundrylogo.png" alt="" height='80px' width='120px'/>
                        <h1>Tidy Laundry</h1>
                    </div>                    
                </div>
                
                <div className='signupBody'>
                    <div className='signupBodyAnimate' ref={animateNextPageRef}>
                        <div className='firstSignupPage'>

                            <div>
                                <label htmlFor="">Register as</label>
                                <select name="" id="" value={role}onChange={(e)=>{setRole(e.target.value)}}>                       
                                        <option value="admin">Admin</option>
                                        <option value="customer">Customer</option>
                                </select>
                            </div>

                            <div>
                                    <label htmlFor="">Phone</label>
                                    <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='1234567891'/>
                            </div>

                            <div>
                                    <label htmlFor="">Email</label>
                                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='xyz@gmail.com'/>
                            </div>

                            <div>
                                <button className='signupNextButton' onClick={handleNextSignupPage}>
                                    Next
                                </button>
                            </div>

                        </div>
                            <div className='secondSignupPage'>

                                <div>
                                    <label htmlFor="">Username</label>
                                    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username'/>
                                </div>

                                <div>
                                    <label htmlFor="">Password</label>
                                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
                                </div>

                                <div>
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='password'/>
                                </div>

                                

                                <div>
                                    <button className='signupPreviousButton' onClick={handleNextSignupPage}>
                                        Previous
                                    </button>
                                </div>

                        </div>  
                    </div>
                </div>

                <div className='loginFooter'>
                    <div>
                        <button className='signupSubmitButton' onClick={handleSubmit}>
                            Signup
                        </button>
                    </div>
                    
                    <div>
                        Already have an account?
                        
                        <Link to='/login'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
