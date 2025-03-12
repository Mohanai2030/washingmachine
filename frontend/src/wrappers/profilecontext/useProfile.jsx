import { useContext } from "react";
import ProfileContext from "./profileContext";

export default function useProfile(){
    return useContext(ProfileContext);
}