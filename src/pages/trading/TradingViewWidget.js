import React, {useEffect} from "react";

const TradingViewWidget = () => {
    useEffect(() => {
        let theme = document.documentElement.getAttribute("data-theme");
        let tradingTheme = theme === "dark" ? "dark" : "light";
        console.log(`the trading theme is ${theme}..... ${tradingTheme}---------`);
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text = `
                {"symbols": [
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
                "colorTheme": ${tradingTheme},
                "isTransparent": true,
                "displayMode": "adaptive",
                "locale": "in"
            }`;
        tradingViewWidget.appendChild(script);
        document.getElementById("root").appendChild(tradingViewWidget);

        return () => {
            // clean up the script when the component in unmounted
            document.getElementById("tradingView").remove();
        }
    }, [theme]);
    return (
        <div>

        </div>
    )
};

export default TradingViewWidget;