import { Outlet } from "react-router-dom";
import { Aligner } from "../components/aligner/Aligner";
import { Header } from "../components/header/header";

export function HeaderAlignerWrapper(){
    return (
        <>
            <Header/>
            <Aligner>
                <Outlet/>
            </Aligner>
        </>
    )
}