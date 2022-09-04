import React, {useCallback, useEffect, useState} from "react";
import Image from "./Image";
import {useNavigate} from "react-router";
import Lightbox from 'react-image-lightbox';
import RichTextEditorDraft from "./RichTextEditorDraft";
import {convertFromRaw} from "draft-js";
import RichTextEditorCustom from "./RichTextEditorCustom";

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

    const {_id, images, content, category, createdAt, updatedAt} = post;
    console.log("the content is ----jaffa", content);
    const navigate = useNavigate();

    const getImg = (imgSrc, index) => {
        setPhotoIndex(index);
        setIsOpen(true);
        console.log(`image clicked and the modal is ${isOpen}`);
        if (!isEmptyPushState) {
            setIsEmptyPushState(true);
            console.log("the history pushstate is being called ----jaffa");
            window.history.pushState(null, '', window.location.href);
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        setIsEmptyPushState(false);
    }

    const closeModalOnBack = useCallback(e => {
        console.log("the back button is clicked --jaffa");
        closeModal();
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', closeModalOnBack);
        return () => {
            window.removeEventListener("popstate", closeModalOnBack);
        }
    }, [closeModalOnBack]);


    return (
        <div className="postCard">
            {category && <div className={`postCard__category postCard__category__${category}`}>
                {category}
            </div>}
            <div
                // onClick={() => navigate(`/post/${_id}`)} --uncomment this ---jaffa
                className="postCard__content">
                <RichTextEditorCustom initialText={content} readOnly={true}>
                </RichTextEditorCustom>
                {/*{showPostedBy && (*/}
                {/*    <small>@{postedBy.username}</small>*/}
                {/*)}*/}
            </div>
            {images && images.length > 0 && <div className="postCard__images">
                {images.map((i, index) => (<div className="postCard__images__image" key={index}>
                    <img src={i.url} key={i.public_id} alt={i.public_id}
                         style={{width: '100%'}}
                         onClick={() => getImg(i.url, index)}
                    />
                </div>))}
            </div>}
            <div className="postCard__postedTime">
                <div className="postCard__createdAt">
                    Posted at: {new Date(createdAt).toLocaleString()}
                </div>
                {createdAt !== updatedAt && <div className="postCard__updatedAt">
                    Last updated: {new Date(updatedAt).toLocaleString()}
                </div>}
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
            {/*<hr/>*/}
        </div>
    )
};

export default PostCard;