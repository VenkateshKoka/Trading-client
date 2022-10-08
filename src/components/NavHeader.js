import React, {Fragment, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {auth} from "../firebase";
import {AuthContext} from "../context/authContext";
import {signOut} from "firebase/auth";
import {toast} from "react-toastify";
import Search from "./Search";
import DarkMode from "./DarkMode";

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
        <header id="navbar">
            <nav className="navbar-container container">
                <Link to="/" className="home-link">
                    <div className="navbar-logo">
                        <img src={require('../assets/squigly-globe.webp')} alt="Logo for venkateshkoka.com"/>
                    </div>
                    <span>Jaffa</span>
                </Link>

                <div
                    // type="button"
                    id="navbar-toggle"
                    aria-controls="navbar-menu"
                    aria-label="Toggle menu"
                    aria-expanded="false"
                >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </div>
                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <div className="navbar-links">
                        <DarkMode></DarkMode>
                        <div className="navbar-item"><Link className="navbar-link" to="/livestream">Livestream</Link>
                        </div>
                        {user && (
                            <div className="navbar-item">
                                <Link className="navbar-link" aria-current="page" to="/profile">
                                    Profile
                                </Link>
                            </div>
                        )}
                        {!user &&
                            <Fragment>
                                <div className="navbar-item">
                                    <Link className="navbar-link" aria-current="page" to="/register">Register</Link>
                                </div>
                                <div className="navbar-item">
                                    <Link className="navbar-link" aria-current="page" to="/login">Login</Link>
                                </div>
                            </Fragment>
                        }
                        {user && (
                            <div className="navbar-item">
                                <Link className="navbar-link" aria-current="page" to="/login"
                                      onClick={logout}>Logout</Link>
                            </div>
                        )}
                        {/*<li className="navbar-item"><Link className="navbar-link" to="/profile">Profile*/}
                        {/*    /!*<img src={profileImage} width="50px"/>*!/*/}
                        {/*</Link></li>*/}
                        {/*<li className="navbar-item"><Link className="navbar-link" to="/register">Register*/}
                        {/*    /!*<img src={bulbSvg} width="50px"/>*!/*/}
                        {/*</Link></li>*/}
                        {/*<li className="navbar-item"><Link className="navbar-link" to="/login">Login</Link></li>*/}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavHeader;