import React, {useState} from "react";
import Image from "./Image";
import {useNavigate} from "react-router";


const PostCard = ({
                      post,
                      handleDelete = (f) => f,
                      showPostedBy = true,
                      showUpdateButton = false,
                      showDeleteButton = false
                  }) => {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const {_id, images, content, postedBy} = post;
    const navigate = useNavigate();

    const getImg = (imgSrc) => {
        console.log("jaffa image clicked");
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    const closeModel = () => {
        setModel(false);
    }

    return (
        <div className="postCard">
            {showPostedBy && (
                <small>@{postedBy.username}</small>
            )}
            <div onClick={() => navigate(`/post/${_id}`)}>
                {content}
            </div>
            <div className={model ? 'model open' : 'model container'}>
                <img src={tempImgSrc}></img>
                {/*<i className="far fa-times-circle"></i>*/}
                <i className="far fa-times-circle" onClick={() => closeModel()}></i>
            </div>
            <div className="postCard__images">
                {images.map(i => (<div className="postCard__images__image">
                    <img src={i.url} key={i.public_id} alt={i.public_id}
                         style={{width: '100%'}}
                         onClick={() => getImg(i.url)}
                    />
                </div>))}
            </div>
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