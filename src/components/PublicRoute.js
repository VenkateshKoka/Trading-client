import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/authContext";
import {useNavigate, useLocation} from "react-router";

const PublicRoute = ({children}) => {
    const {state} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            // look at this implications and side-effects ---jaffa, when you login it goes to profile
            // and redirect sometimes. Something glitchy with this.
            navigate("/profile");
        }
    }, [state.user]);

    return (
        <div className="container">{children}</div>
    )
}

export default PublicRoute;