import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router";
import {auth, googleAuthProvider} from "../../firebase";
import {toast} from "react-toastify";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import AuthForm from "../../components/forms/AuthForm";
import {Link} from "react-router-dom";
import Button from "../../components/Button";

const USER_CREATE = gql`
    mutation userCreate {
        userCreate {
           username
           email
        }
    }
`;

const Login = () => {
    const {dispatch} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userCreate] = useMutation(USER_CREATE);

    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {email: user.email, token: idTokenResult.token}
            });

            toast.success("Logged in successfully !!!")

            // send user info to our server mongodb to either update/create
            navigate("/");

        } catch (e) {
            console.log("login error", e);
            toast.error(e.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {email: user.email, token: idTokenResult.token}
            });

            // send user info to our server mongodb to either update/create
            await userCreate();
            navigate("/");

        } catch (e) {
            console.log("google login error", e);
            toast.error(`google login error ${e.message}`);
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <div className="login__welcome">
                <h1>Welcome to the Jaffa team</h1>
                <p>Explain the functionalities unlocked by creating an account or logging in.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequats</p>
            </div>
            <div className="login__form">
                {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Come join us</h4>)}
                <div className="login__form__social">
                    <span>Sign in using</span>
                    <Button onClick={googleLogin} className="btn buttonJ buttonJ__primary"
                            ripple={true}><i
                        className="fab fa-google fa-lg me-4"></i>
                        Google</Button>
                </div>
                <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                <AuthForm email={email} password={password} setEmail={setEmail} setPassword={setPassword}
                          loading={loading} handleSubmit={handleSubmit} showPasswordInput={true}/>
                <Link className="small" to="/password/forgot">Forgot Password?</Link>
                <div className="d-flex align-items-center justify-content-center pb-4 mt-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-danger"
                            data-mdb-ripple-color="#FF8800">Register
                        here
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Login;