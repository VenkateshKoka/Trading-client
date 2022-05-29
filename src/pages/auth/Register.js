import React, {useState} from "react";
import {auth} from "../../firebase";
import {sendSignInLinkToEmail} from "firebase/auth";
import {toast} from 'react-toastify';
import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
    const [email, setEmail] = useState('stockmarketwizard4@gmail.com');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true
        };
        await sendSignInLinkToEmail(auth, email, config);

        toast.success(`Email is set to ${email}. clink the link to complete registration`);

        //  save the email to local storage
        window.localStorage.setItem('emailForRegistration', email);
        // clear state
        setEmail('');
        setLoading(false);
    }
    return (
        <div className="container">
            {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Register</h4>)}
            <AuthForm email={email} loading={loading} setEmail={setEmail} handleSubmit={handleSubmit}/>
        </div>
    )
};

export default Register;