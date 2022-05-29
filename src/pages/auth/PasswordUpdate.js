import React, {useState} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";
import {updatePassword} from "firebase/auth";

const PasswordUpdate = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updatePassword(auth.currentUser, password)
            .then(() => {
                setLoading(true);
                toast.success('Password updated')
            }).catch(e => {
                setLoading(false);
                toast.error(e.message);
            })
    }

    return (
        <div className="container p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password Update</h4>}

            <AuthForm
                password={password}
                setPassword={setPassword}
                loading={loading}
                handleSubmit={handleSubmit}
                showPasswordInput={true}
                hideEmailInput={true}
            />
        </div>
    )

};

export default PasswordUpdate;
