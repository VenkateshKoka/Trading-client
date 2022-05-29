import React, {useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/authContext";
import {useQuery, useMutation} from "@apollo/react-hooks";
import FileUpload from "../../components/FileUpload";
import {POST_CREATE, POST_DELETE} from "../../graphql/mutations";
import {GET_ALL_POSTS_BY_USER} from "../../graphql/queries";
import PostCard from "../../components/PostCard";

const initialState = {
    content: '',
    images: []
};

const Post = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    // query
    const {data: posts} = useQuery(GET_ALL_POSTS_BY_USER);

    const [postCreate] = useMutation(POST_CREATE, {
        // update cache
        update: (cache, {data: {postCreate}}) => {
            // readQuery from cache
            const {postsByUser} = cache.readQuery({
                query: GET_ALL_POSTS_BY_USER
            });

            // write Query to cache
            cache.writeQuery({
                query: GET_ALL_POSTS_BY_USER,
                data: {
                    postsByUser: [...postsByUser, postCreate]
                }
            })
        },
        onError: (e) => console.log(e)
    });

    const [postDelete] = useMutation(POST_DELETE, {
        update: ({data}) => {
            toast.info('Post deleted');
        },
        onError: (e) => {
            console.log(e);
            toast.error('Post delete failed!');
        }
    });

    const handleDelete = async (postId) => {
        let answer = window.confirm('Delete the post?');
        if (answer) {
            setLoading(true);
            postDelete({
                variables: {postId},
                refetchQueries: [{query: GET_ALL_POSTS_BY_USER}]
            });
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await postCreate({variables: {input: values}});
        setValues(initialState);
        setLoading(false);
        toast.success("Post created");
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value})
    }

    const createPostForm = () => (
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

    return (
        <div className="container p-5">
            <div className="row">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create</h4>}
                {createPostForm()}
                <hr/>
                {posts && posts.postsByUser.map(p => (
                    <div className="col-md-4" key={p._id}>
                        <PostCard post={p} showPostedBy={false} showUpdateButton={true} showDeleteButton={true}
                                  handleDelete={handleDelete}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;
