import React, {useContext, useMemo, useState} from "react";
import {gql} from "apollo-boost";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {toast} from "react-toastify";
import {PROFILE_INFO} from "../../graphql/queries";
import {USER_UPDATE} from "../../graphql/mutations";
import UserProfile from "../../components/forms/UserProfile";
import FileUpload from "../../components/FileUpload";

const Profile = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        images: []
    })
    const [loading, setLoading] = useState(false);

    const {data} = useQuery(PROFILE_INFO);

    useMemo(() => {
        if (data) {
            setValues({
                ...values,
                username: data.profile.username,
                name: data.profile.name,
                email: data.profile.email,
                about: data.profile.about,
                images: data.profile.images
            })
        }
    }, [data]);

    // mutation
    const [userUpdate] = useMutation(USER_UPDATE, {
        update: ({data}) => {
            toast.success('Profile updated');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        userUpdate({variables: {input: values}})
        setLoading(false);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className="container p-5">
            <div className="col-md-12 pb-3">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Profile</h4>}
            </div>
            <div className="form-group">
                <FileUpload setValues={setValues} setLoading={setLoading} values={values} loading={loading}/>
            </div>
            <UserProfile {...values} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading}/>
        </div>
    )
}

export default Profile;
