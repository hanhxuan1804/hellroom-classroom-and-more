import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Header from "../common/header"


const ProtectedLayout = () => {
    const navigate = useNavigate();
    const user = useAuth();
    // user.token = 'this is a token'
    // console.log(user);
    useEffect(
        () => {
            if (!user.token) {
                // console.log("No token found");
                navigate("/auth/login");
            }
        }
    )
    return (
        <>
            <Header></Header>
            <Outlet/>
        </>
    )
}

export default ProtectedLayout