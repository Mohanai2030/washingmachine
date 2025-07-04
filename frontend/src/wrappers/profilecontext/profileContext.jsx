import { Children, createContext, useState } from "react";

const ProfileContext = createContext({})


export function ProfileProvider({children}){
    const [profile,setProfile] = useState();
    return (
        <ProfileContext.Provider value={{profile,setProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}


export default ProfileContext;