import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {SINGLE_POST} from "../../graphql/queries";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useParams} from "react-router";
import FileUpload from "../../components/FileUpload";
import {POST_UPDATE} from "../../graphql/mutations";

const PostUpdate = () => {
    const [values, setValues] = useState({
        _id: '',
        content: '',
        images: [{
            url: '',
            public_id: ''
        }]
    });
    const [getSinglePost, {data: singlePost}] = useLazyQuery(SINGLE_POST);
    const [postUpdate] = useMutation(POST_UPDATE);
    const [loading, setLoading] = useState(false);
    const {_id, images, content} = values;


    useMemo(() => {
        if (singlePost) {
            setValues({
                ...values,
                _id: singlePost.singlePost._id,
                content: singlePost.singlePost.content,
                images: singlePost.singlePost.images,
            })
        }
    }, [singlePost]);

    const {postid} = useParams();

    useEffect(() => {
        getSinglePost({variables: {postId: postid}});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await postUpdate({variables: {input: values}});
        setLoading(false);
        toast.success("Post Updated");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }

    const updatePostForm = () => (
        <form onSubmit={handleSubmit}>
            <textarea name="content"
                      className="md-textarea form-control"
                      id="content"
                      value={values.content}
                      onChange={handleChange}
                      disabled={loading}
                      rows="5"
                      cols="30"
                      maxLength="1000"
                      placeholder="write something cool here to post"
            />
            <FileUpload values={values} loading={loading} setValues={setValues} setLoading={setLoading}/>
            <button className="btn btn-primary" type="submit" disabled={loading || !values.content}>Post</button>
        </form>
    );

    return (<div className="container p-5">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update</h4>}
        {updatePostForm()}
    </div>)
};

export default PostUpdate;