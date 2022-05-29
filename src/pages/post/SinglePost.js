import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {SINGLE_POST} from "../../graphql/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router";
import FileUpload from "../../components/FileUpload";
import PostCard from "../../components/PostCard";

const SinglePost = () => {
    const [values, setValues] = useState({
        _id: '',
        content: '',
        images: [{
            url: '',
            public_id: ''
        }],
        postedBy: {}
    });
    const [getSinglePost, {data: singlePost}] = useLazyQuery(SINGLE_POST);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        if (singlePost) {
            setValues({
                ...values,
                _id: singlePost.singlePost._id,
                content: singlePost.singlePost.content,
                images: singlePost.singlePost.images,
                postedBy: singlePost.singlePost.postedBy
            })
        }
    }, [singlePost]);

    const {postid} = useParams();

    useEffect(() => {
        getSinglePost({variables: {postId: postid}});
    }, []);


    return (<div className="container p-5">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Post Info</h4>}
        <PostCard post={values}/>
    </div>)
};

export default SinglePost;