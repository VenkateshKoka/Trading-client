import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/authContext";
import {useNavigate, useLocation} from "react-router";

const PublicRoute = ({children}) => {
    const {state} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            navigate("/profile");
        }
    }, [state.user]);

    return (
        <div className="container">{children}</div>
    )
}

export default PublicRoute;