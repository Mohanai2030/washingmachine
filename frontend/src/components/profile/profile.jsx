import { Link } from 'react-router-dom'
import './profile.css'
import useProfile from '../../wrappers/profilecontext/useProfile'

function Capitalize(text){
    let answer = String(text).substring(1,);
    answer = String(text[0]).toUpperCase() + answer
    return answer
}

export function Profile(){
    const {profile} = useProfile()
    return(
        <div className='profileContainer'>
            <div className='profileSubContainer'>
            <div className='profileHeaderContainer'>
                    <h1>
                        Profile
                    </h1>
                </div>
                <table className='profileTable'>
                    <thead>
                    </thead>
                    <tbody>
                        {Object.keys(profile).length && Object.keys(profile).map(profileInfo => {
                            return(
                            <tr>
                                <td><strong>{Capitalize(profileInfo)}</strong></td>
                                <td>{profile[profileInfo]}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}