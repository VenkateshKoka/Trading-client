import React, {Fragment, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {auth} from "../firebase";
import {AuthContext} from "../context/authContext";
import {signOut} from "firebase/auth";
import {toast} from "react-toastify";
import Search from "./Search";
import "../css/main.css";

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


    useEffect(() => {
        import('../componentScripts/navbar');
        return () => {
            // clean up action when the component in unmounted
        }
    }, []);

    return (
        // <nav className="navbar sticky-top navbar-expand-lg bg-light">
        //     <div className="container">
        //         <Link className="navbar-brand" to="/">
        //             <img
        //                 src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
        //                 height="15"
        //                 alt="MDB Logo"
        //                 loading="lazy"
        //             />
        //         </Link>
        //         <button
        //             className="navbar-toggler"
        //             type="button"
        //             data-bs-toggle="collapse"
        //             data-bs-target="#navbarNav"
        //             aria-controls="navbarNav"
        //             aria-expanded="false"
        //             aria-label="Toggle navigation"
        //         >
        //             <i className="fas fa-bars"/>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li className="nav-item">
        //                     <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
        //                 </li>
        //                 {user && (
        //                     <li className="nav-item">
        //                         <Link className="nav-link active" aria-current="page" to="/profile">
        //                             Profile
        //                         </Link>
        //                     </li>
        //                 )}
        //                 {!user &&
        //                 <Fragment>
        //                     <li className="nav-item">
        //                         <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        //                     </li>
        //                 </Fragment>
        //                 }
        //                 {user && (
        //                     <li className="nav-item">
        //                         <Link className="nav-link active" aria-current="page" to="/login"
        //                               onClick={logout}>Logout</Link>
        //                     </li>
        //                 )}
        //             </ul>
        //             {/*custom search component*/}
        //             <Search/>
        //         </div>
        //     </div>
        // </nav>
        <header id="navbar">
            <nav className="navbar-container container">
                <Link to="/" className="home-link">
                    <div className="navbar-logo"></div>
                    Jaffa
                </Link>
                <button
                    type="button"
                    id="navbar-toggle"
                    aria-controls="navbar-menu"
                    aria-label="Toggle menu"
                    aria-expanded="false"
                >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className="navbar-links">
                        <li className="navbar-item"><Link className="navbar-link" to="/livestream">Livestream</Link>
                        </li>
                        <li className="navbar-item"><Link className="navbar-link" to="/profile">Profile</Link></li>
                        <li className="navbar-item"><Link className="navbar-link" to="/register">register</Link></li>
                        <li className="navbar-item"><Link className="navbar-link" to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavHeader;