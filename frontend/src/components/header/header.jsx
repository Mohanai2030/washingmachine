import useAuth from '../../wrappers/AuthContext/useAuth';
import './header.css'
import { Link,useLocation } from 'react-router-dom'

export function Header(){
    const location = useLocation().pathname;
    let {auth} = useAuth();
    auth = auth?.roles?.[0]
    console.log("auth",auth)
    let current = 1;
    if(location=='/'){
        current = 1
    }else if(location == '/about'){
        current = 2
    }else if(location == '/chat'){
        current = 3
    }else if(location == '/pricing'){
        current = 4
    }else if(location == '/profile'){
        current = 5
    }else if(location == '/billing'){
        current = 6
    }
    // console.log(current,location)
    
    return (
        <div className={`headerContainer ${auth==2000&&'headerAdminContainer'}`}>
            <div className='logoContainer'>
                <Link to='/'>
                    <img src="/images/LaundryLogo.png" alt="" height='50px' width='85px'/>
                </Link>
            </div>
            <div className='navContainer'>
                {auth==1000
                ?<nav>
                    <Link to='/'>
                        <div className={current==1?'currentPage':''}>
                            Home
                        </div>
                    </Link>
                    
                    <Link to='/pricing'>
                        <div className={current==4?'currentPage':''}>
                            Pricing
                        </div>
                    </Link>
                    
                    <Link to='/chat'>
                        <div className={current==3?'currentPage':''}>
                            Chat
                        </div>
                    </Link>
                    

                    <Link to='/profile'>
                        <div className={current==5?'currentPage':''}>
                            Profile
                        </div>
                    </Link>
                </nav>
                :auth==2000
                ?<nav>
                    <Link to='/'>
                        <div className={current==1?'currentPage':''}>
                            Home
                        </div>
                    </Link>
                    
                    <Link to='/pricing'>
                        <div className={current==4?'currentPage':''}>
                            Pricing
                        </div>
                    </Link>
                    
                    <Link to='/chat'>
                        <div className={current==3?'currentPage':''}>
                            Chat
                        </div>
                    </Link>
                    

                    <Link to='/profile'>
                        <div className={current==5?'currentPage':''}>
                            Profile
                        </div>
                    </Link>

                    <Link to='/billing'>
                        <div className={current==6?'currentPage':''}>
                            Billing
                        </div>
                    </Link>
                </nav>
                :<nav>
                    <Link to='/'>
                        <div className={current==1?'currentPage':''}>
                            Home
                        </div>
                    </Link>
                    
                    <Link to='/pricing'>
                        <div className={current==4?'currentPage':''}>
                            Pricing
                        </div>
                    </Link>
                    
                    <Link to='/chat'>
                        <div className={current==3?'currentPage':''}>
                            Chat
                        </div>
                    </Link>

                    <Link to='/login' className='loginSignupHeaderContainer'>
                        <button className='loginSignupHeader'>
                            Login/Signup
                        </button>
                    </Link>
                </nav>
            }
                
    
                
            </div>
        </div>
    )
}