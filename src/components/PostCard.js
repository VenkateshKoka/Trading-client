import React, {useEffect, useState} from "react";
import Image from "./Image";
import {useNavigate} from "react-router";
import Lightbox from 'react-image-lightbox';

const PostCard = ({
                      post,
                      handleDelete = (f) => f,
                      showPostedBy = true,
                      showUpdateButton = false,
                      showDeleteButton = false
                  }) => {

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isEmptyPushState, setIsEmptyPushState] = useState(false);

    const {_id, images, content, postedBy} = post;
    const navigate = useNavigate();

    const getImg = (imgSrc, index) => {
        console.log("jaffa image clicked");
        setPhotoIndex(index);
        setIsOpen(true);
        if (!isEmptyPushState) {
            setIsEmptyPushState(true);
            window.history.pushState(null, '', window.location.href)
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        setIsEmptyPushState(false);
        // window.history.popstate();
    }

    useEffect(() => {
        window.addEventListener('popstate', closeModalOnBack);
        return () => {
            window.removeEventListener("popstate", closeModalOnBack);
        }
    }, [isOpen]);

    const closeModalOnBack = (e) => {
        console.log("the back button is clicked --jaffa");
        if (isOpen) {
            console.log("the modal is open ---jaffa");
            setIsOpen(false);
            e.preventDefault();
        }
    }


    return (
        <div className="postCard">
            {showPostedBy && (
                <small>@{postedBy.username}</small>
            )}
            <div onClick={() => navigate(`/post/${_id}`)} className="postCard__content">
                <p>{content}</p>
            </div>
            <div className="postCard__images">
                {images.map((i, index) => (<div className="postCard__images__image">
                    <img src={i.url} key={i.public_id} alt={i.public_id}
                         style={{width: '100%'}}
                         onClick={() => getImg(i.url, index)}
                    />
                </div>))}
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex].url}
                    nextSrc={images[(photoIndex + 1) % images.length].url}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
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