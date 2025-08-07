import { Navigate, useLocation} from "react-router-dom";
import { useEffect } from "react";
import Verify from "../components/sign/Verify";
import ResetPassword from "../components/login/ResetPassword";

export default function RequireValidation() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const newEmail = searchParams.get("newEmail");
    const initMail = searchParams.get("initMail");

    useEffect(()=>{
   },[email, token, initMail])

    return (
        <>
        {
            token ? <Verify token={token} initMail={initMail === "true" ? true : false} email={email} newEmail={newEmail} /> : (
                email? <ResetPassword email={email}/> : <Navigate to='/login' />
            )
        }
        </>
    )
}