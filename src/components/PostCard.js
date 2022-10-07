import React, {useCallback, useEffect, useState} from "react";
import Image from "./Image";
import {useNavigate} from "react-router";
import Lightbox from 'react-image-lightbox';
import RichTextEditorDraft from "./RichTextEditorDraft";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
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

    let blocks = content && JSON.parse(content).blocks;
    let richTextPlain = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    const navigate = useNavigate();

    const getImg = (imgSrc, index) => {
        setPhotoIndex(index);
        setIsOpen(true);
        if (!isEmptyPushState) {
            setIsEmptyPushState(true);
            window.history.pushState(null, '', window.location.href);
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        setIsEmptyPushState(false);
    }

    const closeModalOnBack = useCallback(e => {
        closeModal();
    }, []);

    useEffect(() => {
        const twitterScript = document.createElement('script');
        twitterScript.type = "text/javascript";
        twitterScript.src = "https://platform.twitter.com/widgets.js";
        twitterScript.async = true;
        document.body.appendChild(twitterScript);
        window.addEventListener('popstate', closeModalOnBack);
        return () => {
            document.body.removeChild(twitterScript);
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
            <div className="postCard__twitterShare">
                <a
                    className="twitter-share-button buttonJ buttonJ__twitterGradient buttonJ__small buttonJ__rounded buttonJ__contentFit"
                    // href="https://twitter.com/share?ref_src=twsrc%5Etfw/tweet?text=Hello%20world"
                    href={`https://twitter.com/intent/tweet?text=${richTextPlain}`}
                    data-show-count="true" data-size="large" dnt="true">
                    <i className="postCard__twitterShare__icon fab fa-twitter"/>
                    <span className="postCard__twitterShare__text">tweet</span>
                </a>
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