import React, {useEffect} from "react";
import {gsap} from "gsap";

// import('../../scss/animations/_forwardTriangle.scss');

const ForwardTriangle = () => {
    useEffect(() => {
        let play_tl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "elastic.inOut(2, 0.75)"
            },
            repeat: -1,
            repeatDelay: 2
        });

        play_tl
            .to("#tri-second", {x: 17, fill: "#1BB978"}, 0)
            .to("#tri-third", {x: 34, opacity: 0}, 0)
            .to("#tri-first", {x: 35}, 0);
    }, []);

    return (
        <div className="circle-bg" id="play-icon">
            <svg
                id="tri-first"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19.1626 9.42599C20.2791 10.0284 20.2791 11.9716 19.1626 12.574L1.96636 21.8525C1.03986 22.3524 -4.42439e-08 21.5201 0 20.2785L6.61299e-07 1.72148C7.05543e-07 0.479927 1.03986 -0.352444 1.96636 0.147468L19.1626 9.42599Z"
                    fill="#6ED69A"
                />
            </svg>
            <svg
                id="tri-second"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19.1626 9.42599C20.2791 10.0284 20.2791 11.9716 19.1626 12.574L1.96636 21.8525C1.03986 22.3524 -4.42439e-08 21.5201 0 20.2785L6.61299e-07 1.72148C7.05543e-07 0.479927 1.03986 -0.352444 1.96636 0.147468L19.1626 9.42599Z"
                />
            </svg>
            <svg
                id="tri-third"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19.1626 9.42599C20.2791 10.0284 20.2791 11.9716 19.1626 12.574L1.96636 21.8525C1.03986 22.3524 -4.42439e-08 21.5201 0 20.2785L6.61299e-07 1.72148C7.05543e-07 0.479927 1.03986 -0.352444 1.96636 0.147468L19.1626 9.42599Z"
                    fill="#1BB978"
                />
            </svg>
        </div>
    )
};

export default ForwardTriangle;