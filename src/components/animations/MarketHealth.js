import React from "react";
import Lottie from "lottie-react";
import marketHealthAnimation from '../../assets/91145-health-insurance.json';

const MarketHealth = () => {
    return (
        <Lottie animationData={marketHealthAnimation}
                style={{width: "70px", height: "70px"}}
                background="transparent"
                speed={1}
                loop={true}
                autoplay={true}
        />
    )
};

export default MarketHealth;