import React from "react";
import Image from "./Image";
import {useNavigate} from "react-router";

const PostCard = ({
                      post,
                      handleDelete = (f) => f,
                      showPostedBy = true,
                      showUpdateButton = false,
                      showDeleteButton = false
                  }) => {
    const {_id, images, content, postedBy} = post;
    const navigate = useNavigate();
    return (
        <div className="postCard">
            {showPostedBy && (
                <small>@{postedBy.username}</small>
            )}
            <div onClick={() => navigate(`/post/${_id}`)}>
                {content}
            </div>
            {images.map(i => (<Image key={i._id} image={i}/>))}
            {showUpdateButton && (
                <button className="btn m-2 btn-primary"
                        onClick={() => navigate(`/post/update/${_id}`)}>Update</button>
            )}
            {showDeleteButton && (
                <button className="btn m-2 btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
            )}
            <hr/>
        </div>
    )
};

export default PostCard;