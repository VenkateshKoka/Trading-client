import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";

const SandTimer = ({width = "60px"}) => {
    return (
        <Player src="https://assets10.lottiefiles.com/packages/lf20_ccpdxyfc.json"
                background="transparent" speed="0.5" style={{display: "flex", width: width}} loop
                autoplay>
        </Player>
    )
};

export default SandTimer;

