import { Link } from 'react-router-dom'
import './profile.css'

export function Profile(){
    return(
        <div>
            Profile
            <Link to='/login'>
                        <div>
                            <button className='homeContactButton' >
                                Sign up for 25% discount
                            </button>
                        </div>
            </Link>
        </div>
    )
}