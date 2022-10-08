import React from "react";
import Lottie from "lottie-react";
import mindsetAnimation from '../../assets/98369-thinking-colors-adapted.json';

const MindsetAnimation = () => {
    return (
        <Lottie animationData={mindsetAnimation}
                style={{marginTop: "-20px", width: "80px", height: "80px"}}
                background="transparent"
                speed={1}
                loop={true}
                autoplay={true}
        />
    )
};

export default MindsetAnimation;