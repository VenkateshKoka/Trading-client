import React from "react";

const Image = ({image, handleImageRemove = f => f}) => (
    <img src={image.url} key={image.public_id} alt={image.public_id} style={{maxHeight: '300px'}}
         onClick={() => handleImageRemove(image.public_id)}
    />
);


export default Image;