import './unauthorized.css'
import { Link } from 'react-router-dom'
export function Unauthorized(){
    return(
        <div>
            <h1>
                Unauthorized
            </h1>
            <Link to ='/login'>
                Login to access the page
            </Link>
        </div>
    )
}