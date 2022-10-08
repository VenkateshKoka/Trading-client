import React from "react";
import Lottie from "lottie-react";
import mainAnimationHome from '../../assets/homepage_main_lf20_xwrbzebb.json';

const MainAnimationHome = () => {
    return (
        <Lottie animationData={mainAnimationHome}
                style={{width: "100%", height: "100%", opacity: "0.9"}}
                background="transparent"
                speed={1}
                loop={true}
                autoplay={true}
        />
    )
};

export default MainAnimationHome;