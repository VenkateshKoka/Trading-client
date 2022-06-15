import React from "react";
import axios from "axios";

const Webhook = () => {
    const handleWebhook = () => {
        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/webhook`)
            .then(response => {
                console.log(response)
            }).catch(e => {
            console.log("Error while getting webhook info", e);
        })
    };

    return (
        <div className="container">
            <p onClick={handleWebhook}> The webhook for tradingview is </p>
        </div>
    )
};

export default Webhook;