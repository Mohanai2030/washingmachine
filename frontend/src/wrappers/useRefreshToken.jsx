import { useLocation } from 'react-router-dom'
import axios from 'axios';
import useAuth from './AuthContext/useAuth';
import useProfile from './profilecontext/useProfile';

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth();
    const {profile} = useProfile()
    const location = useLocation();

    // assume that every time refresh token is called the user is at not at 
    let currentlevel;
    if(auth.roles[0]==1000){
        currentlevel = 'customer'
    }else if(auth.roles[0]==2000){
        currentlevel = 'admin'
    }
    console.log("inside userefresh hook",currentlevel)
    const refresh  = async() => {
        try{
            const response = await axios.post('/api/refresh', {
                role: currentlevel
            }, {
                withCredentials: true
            })
            setAuth(prev => {
                console.log("old access tokwn:",prev.accessToken)
                console.log("new access token:",response.data.authData.accessToken)
                return {...prev,accessToken:response.data.authData.accessToken}
            });
            return response.data.authData.accessToken;
        }
        catch(err){
            console.log("error in refresh token fetching")
            return response.data.authData.accessToken;
        }
    }

    return refresh;
}

export default useRefreshToken;