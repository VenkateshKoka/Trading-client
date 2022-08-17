import React, {useEffect, useState} from "react";

const Image = ({image, handleImageRemove = f => f}) => {
    const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
    const handleMouseMove = (e) => {
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        setBackgroundPosition(`${x}% ${y}%`);
    }
    return (
        // <div className="postCard__images__imageContainer" data-scale={1.6} onMouseMove={(e) => zoom(e)}>
        //     <img src={image.url} key={image.public_id} alt={image.public_id}
        //          style={{height: 'auto', width: "100%", objectFit: "contain"}}
        //          onClick={() => handleImageRemove(image.public_id)}
        //     />
        // </div>

        <figure onMouseMove={(e) => handleMouseMove(e)}
                style={{backgroundImage: `url(${image.url})`, backgroundPosition}}>
            {/*<img src={image.url}/>*/}
            <img src={image.url} key={image.public_id} alt={image.public_id}
                 onClick={() => handleImageRemove(image.public_id)}
            />
        </figure>

        // <div className="img_producto_container" data-scale="1.6" onMouseOver={(e) => mouseOver(e)}
        //      onMouseOut={(e) => mouseOut(e)} onMouseMove={(e) => mouseMove(e)}>
        //     <a
        //         className="dslc-lightbox-image img_producto"
        //         target="_self"
        //         style={{backgroundImage: `url("https://res.cloudinary.com/active-bridge/image/upload/slide1.jpg")`}}>
        //     </a>
        // </div>
    );
};

export default Image;