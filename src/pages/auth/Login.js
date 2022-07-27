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
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
            <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">Login with Google</button>
            <AuthForm email={email} password={password} setEmail={setEmail} setPassword={setPassword}
                      loading={loading} handleSubmit={handleSubmit} showPasswordInput={true}/>
            <Link className="text-danger float-right" to="/password/forgot">Forgot Password</Link>
        </div>
    )
};

export default Login;