import React from "react";
import Lottie, {useLottie, useLottieInteractivity} from "lottie-react";
import sandTimerAnimation from "../../assets/61848-hour-glass-loading.json"

const SandTimer = ({width = "60px"}) => {

    const options = {
        animationData: sandTimerAnimation,
        loop: true,
        autoplay: true,
    };

    const style = {
        width: width,
    }

    const timer = useLottie(options, style);
    timer.setSpeed(0.5);
    return timer.View;
    // return (
    //     <Lottie animationData={sandTimerAnimation}
    //             background="transparent"
    //             style={{width: width}}
    //             loop={true}
    //             autoplay={true}>
    //     </Lottie>
    // )
};

export default SandTimer;

