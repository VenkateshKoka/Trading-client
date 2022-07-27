import React, {useState, useContext, useEffect} from "react";
import {Player} from '@lottiefiles/react-lottie-player';

const LiveStream = () => {
    useEffect(() => {
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text = `
                "symbols": [
            {
                "proName": "FOREXCOM:SPXUSD",
                "title": "S&P 500"
            },
            {
                "proName": "FOREXCOM:NSXUSD",
                "title": "US 100"
            },
            {
                "proName": "FX_IDC:EURUSD",
                "title": "EUR/USD"
            },
            {
                "proName": "BITSTAMP:BTCUSD",
                "title": "Bitcoin"
            },
            {
                "proName": "BITSTAMP:ETHUSD",
                "title": "Ethereum"
            }
                ],
                "showSymbolLogo": true,
                "colorTheme": "light",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "in"
            `;
        tradingViewWidget.appendChild(script);
        document.getElementById("root").appendChild(tradingViewWidget);

        return () => {
            // clean up the script when the component in unmounted
            document.getElementById("tradingView").remove();
        }
    }, []);

    return (
        <div className="livestream container" id="livestream">
            <div className="livestream__posts">
                <h2>This week's watchlist is:</h2>
            </div>
        </div>
    );
}

export default LiveStream;
