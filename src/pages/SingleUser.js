import React from "react";
import {gql, useQuery} from "@apollo/client";
import {useParams} from "react-router";
import UserCard from "../components/UserCard";

const GET_USER_PUBLIC_PROFILE = gql`
    query publicProfile($username: String!) {
        publicProfile(username: $username) {
            _id,
            username,
            images {
                url,
                public_id
            }
            about
        }
    }
`;

const SingleUser = () => {
    let params = useParams();
    const {loading, data} = useQuery(GET_USER_PUBLIC_PROFILE, {
        variables: {username: params.username}
    });

    if (loading) return (<p className="p-5">Loading...</p>);

    return (
        <div className="container">
            <br/>
            <UserCard user={data.publicProfile}/>
        </div>
    );
};

export default SingleUser;