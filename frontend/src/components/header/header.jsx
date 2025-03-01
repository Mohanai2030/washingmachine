import './header.css'
import { Link,useLocation } from 'react-router-dom'

export function Header(){
    const location = useLocation().pathname;
    let current = 0;
    if(location=='/'){
        current = 1
    }else if(location == '/about'){
        current = 2
    }else if(location == '/chat'){
        current = 3
    }else if(location == '/pricing'){
        current = 4
    }
    // console.log(current,location)
    
    return (
        <div className="headerContainer">
            <div className='logoContainer'>
                <img src="../../../public/images/Laundrylogo.png" alt="" height='50px' width='85px'/>
            </div>
            <div className='navContainer'>
                <nav>
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
                    
                    <Link to='/about'>
                        <div className={current==2?'currentPage':''}>
                            About
                        </div>
                    </Link>
    
                </nav>
            </div>
        </div>
    )
}