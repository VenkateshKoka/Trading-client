import React from "react";

const SpinningHexagon = () => {
    return (
        <div className="animated-svg">
            <svg className="spinning-hexagon" version="1.1" id="integration" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 100 100">
                <g id="lines">
                    <line fill="none" x1="16" y1="70" x2="84" y2="30"/>
                    <line fill="none" x1="84" y1="70.729" x2="16" y2="30"/>
                    <line fill="none" x1="50" y1="11" x2="50" y2="89"/>
                    <line fill="none" x1="50" y1="11" x2="84" y2="29.271"/>
                    <line fill="none" x1="84" y1="30" x2="84" y2="71"/>
                    <line fill="none" x1="84" y1="71" x2="50" y2="89"/>
                    <line fill="none" x1="50" y1="89" x2="16" y2="70"/>
                    <line fill="none" x1="16" y1="70" x2="16" y2="30"/>
                    <line fill="none" x1="16" y1="30" x2="50" y2="11"/>
                </g>
                <g id="symbol">
                    <g>
                        <path fillRule="evenodd" clipRule="evenodd" fill="#2274C6" d="M64.709,35.282c-8.016-8.014-21.008-8.014-29.022,0
                                c-4.101,4.101-6.098,9.504-6.002,14.878l2.39-1.885l2.702,1.908c-0.102-4.079,1.398-8.189,4.51-11.3
                                c6.026-6.026,15.796-6.026,21.823-0.001c2.502,2.503,3.963,5.65,4.385,8.908c0.111,0.838-1.279-0.745-1.309,0.1l3.869,2.438
                                l4.074-2.799c0.027-0.91-1.434,0.99-1.531,0.084C70.121,43.109,68.16,38.734,64.709,35.282z"/>
                        <path fillRule="evenodd" clipRule="evenodd" fill="#EFB054" d="M61.109,61.118c-6.027,6.024-15.797,6.026-21.823,0
                                c-2.185-2.186-3.576-4.864-4.174-7.678c-0.201-0.938,2.042,0.589,2.017-0.366l-5.055-2.491l-4.203,3.703
                                c0.021,1.175,1.955-1.366,2.176-0.209c0.745,3.897,2.623,7.622,5.64,10.64c8.014,8.016,21.011,8.016,29.022,0.002
                                c3.869-3.869,5.863-8.896,5.998-13.966l-2.703,1.676l-2.387-1.699C65.488,54.503,63.988,58.238,61.109,61.118z"/>
                    </g>
                </g>
                <g id="colors">
                    <circle fill="#777777" cx="50" cy="10.844" r="4.265"/>
                    <circle fill="#EFB054" cx="16" cy="30" r="4.265"/>
                    <circle fill="#2274C6" cx="16" cy="70" r="4.265"/>
                    <circle fill="#777777" cx="50" cy="89.156" r="4.265"/>
                    <circle fill="#EFB054" cx="84" cy="70.729" r="4.265"/>
                    <circle fill="#2274C6" cx="84" cy="30" r="4.265"/>
                </g>
            </svg>
        </div>
    )
};

export default SpinningHexagon;