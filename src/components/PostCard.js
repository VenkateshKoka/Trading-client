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
        <div className="card text-center" style={{minHeight: '275px'}}>
            <div className="card-body">
                {showPostedBy && (
                    <div className="card-title">
                        <h5>@{postedBy.username}</h5>
                    </div>
                )}
                <hr/>
                <p className="card-text" onClick={() => navigate(`/post/${_id}`)}>
                    {content}
                </p>
                {images.map(i => (<Image key={i._id} image={i}/>))}
                <div className="pt-5">
                    {showUpdateButton && (
                        <button className="btn m-2 btn-primary"
                                onClick={() => navigate(`/post/update/${_id}`)}>Update</button>
                    )}
                    {showDeleteButton && (
                        <button className="btn m-2 btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default PostCard;