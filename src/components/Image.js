import React from "react";

const Image = ({image, handleImageRemove = f => f}) => (
    <div className="postCard__images__image">
        <img src={image.url} key={image.public_id} alt={image.public_id}
             style={{width: '100%'}}
             onClick={() => handleImageRemove(image.public_id)}
        />
    </div>
);


export default Image;