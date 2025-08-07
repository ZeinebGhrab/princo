import { Outlet } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useAppSelector } from "../api/hooks";

export default function RequiredAuthorization(){
    const roles = useAppSelector(state => state.authentication.data?.roles);
    const isAdmin = roles?.includes('admin');

        return(
            <>
            {
                isAdmin ? <Outlet /> : <PageNotFound/>
            }
            </>
        )
    
}