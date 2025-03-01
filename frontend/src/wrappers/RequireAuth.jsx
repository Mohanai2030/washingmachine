import { Outlet,Navigate } from "react-router-dom"

export function RequireAuth({allowedRoles}){
    const {auth} = useAuth();
    const role = auth?.rolees?.[0]
    return(
        allowedRoles.includes(role)
        ?<Outlet/>
        :auth?.roles?<Navigate to='/unauthorized'/>:<Navigate to='/'/>
    )
}