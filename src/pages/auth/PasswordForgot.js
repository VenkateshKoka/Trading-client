import React, {useState} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";
import {sendPasswordResetEmail} from "firebase/auth";

const PasswordForgot = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_PASSWORD_FORGET_REDIRECT,
            handleCodeInApp: true
        };

        await sendPasswordResetEmail(auth, email, config).then(() => {
            toast.success(`Password reset link is sent to ${email}`);
            setEmail('');
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            console.log("error on the password reset email", e);
        })
    }

    return (
        <div className="container p-5">
            <div className="passwordForgot">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password ?</h4>}
                {loading ? <p className="text-danger">Loading...</p> :
                    <p> Submit your registered email and get a password reset link sent to your email ?</p>}
                <AuthForm
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
};

export default PasswordForgot;
