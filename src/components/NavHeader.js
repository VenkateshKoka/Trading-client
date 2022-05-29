import React, {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {auth} from "../firebase";
import {AuthContext} from "../context/authContext";
import {signOut} from "firebase/auth";
import {toast} from "react-toastify";
import Search from "./Search";


const NavHeader = () => {

    const {state, dispatch} = useContext(AuthContext);
    let navigate = useNavigate();

    const {user} = state;

    const logout = async () => {
        try {
            const logout = await signOut(auth);
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: null
            });
            navigate("/login");
            toast.info("Logged out !!")
        } catch (e) {
            console.log("The logout error is", e)
        }
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                        height="15"
                        alt="MDB Logo"
                        loading="lazy"
                    />
                    <small>MDBootstrap</small>
                </Link>
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
                            </li>
                            {user && (
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                            )}
                            {!user &&
                            <Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                                </li>
                            </Fragment>
                            }
                            {user && (
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login"
                                          onClick={logout}>Logout</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/*custom search component*/}
                <Search/>
            </div>
        </nav>
    )
}

export default NavHeader;