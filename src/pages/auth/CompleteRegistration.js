import React, {useState, useEffect, useContext} from "react";
import {auth} from "../../firebase";
import {isSignInWithEmailLink, signInWithEmailLink, updatePassword} from "firebase/auth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {AuthContext} from "../../context/authContext";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
    mutation userCreate {
        userCreate {
           username
           email
        }
    }
`;

const CompleteRegistration = () => {
    const {dispatch} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [navigate]);

    const [userCreate] = useMutation(USER_CREATE);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast.error('Email and password are required!!');
            return
        }
        try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            if (result.user && result.user.emailVerified) {
                // remove email from local storage
                let user = auth.currentUser;
                await updatePassword(user, password);
                window.localStorage.removeItem('emailForRegistration');

                // dispatch user with token and email, then redirect
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {email: user.email, token: idTokenResult}
                });
                // make api request to save/update user in mongodb
                await userCreate();
                navigate("/");

            }
        } catch (error) {
            console.log('register completion error', error.message);
            setLoading(false);
            toast.error(error.message);
        }

    }

    return (
        <div className="container">
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Complete Registration</h4>)}
            <AuthForm email={email} password={password} setEmail={setEmail} setPassword={setPassword}
                      loading={loading} handleSubmit={handleSubmit} showPasswordInput={true}/>
        </div>
    );
}

export default CompleteRegistration;