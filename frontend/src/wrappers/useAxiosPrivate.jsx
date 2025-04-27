import axiosPrivate from "../privateAPI/axiosConfig";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./AuthContext/useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
 
    useEffect(() => {
        console.log("entered the useAxiosPrivate");
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async(config) => {
                console.log("config",!config.headers['Authorization'],config)
                console.log("auth:",auth);
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `bearer ${auth?.accessToken}`
                    console.log('config headers authorization set to',config.headers['Authorization'])
                }
                return config;
            },(error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if((error.response.status === 403 || error.response.status === 401) && !prevRequest.sent){
                    prevRequest.sent = true;
                    const newaccesstoken = await refresh();
                    prevRequest.headers['Authorization'] = `bearer ${newaccesstoken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);   
        }
    })
    return axiosPrivate;
}

export default useAxiosPrivate;