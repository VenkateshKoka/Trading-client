import React, {useState, useContext, useEffect} from "react";
import loadable from '@loadable/component';
import {useNavigate} from "react-router-dom";
import {stringifyForDisplay} from "@apollo/client/utilities";


const MainAnimationHome = loadable(() => import("../components/animations/MainAnimationHome"));
const MarketHealth = loadable(() => import("../components/animations/MarketHealth"));
const Mindset = loadable(() => import("../components/animations/Mindset"));

const ForwardTriangle = loadable(() => import("../components/animations/ForwardTriangle"));
const SpinningHexagon = loadable(() => import("../components/animations/SpinningHexagon"));
const BulbBlinking = loadable(() => import("../components/animations/BulbBlinking"));
const SandTimer = loadable(() => import("../components/animations/SandTimer"));

const Home = () => {
    const navigate = useNavigate();

    let item;
    const checkDarkThemeData = () => {
        item = localStorage.getItem("theme");

        if (item) {
            // console.log(`the theme is ${item}-----jaffa`);
        }
    }
    const td = (item) => {
        if (document.getElementById("tradingView")) {
            document.getElementById("tradingView").remove();
        }
        const tradingViewWidget = document.createElement("div");
        tradingViewWidget.setAttribute("id", "tradingView");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.text =
            `{
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
                "colorTheme": ${stringifyForDisplay(item)},
                "isTransparent": true,
                "displayMode": "adaptive",
                "locale": "in"
            }`;
        tradingViewWidget.appendChild(script);
        document.getElementById("root").appendChild(tradingViewWidget);
    }
    useEffect(() => {
        checkDarkThemeData();
        td(item);

        const mutationCallback = (mutationsList) => {
            // console.log("the mutations are ---jaffa", mutationsList);
            for (const mutation of mutationsList) {
                if (
                    mutation.type !== "attributes" ||
                    mutation.attributeName !== "data-theme"
                ) {
                    return
                }
                checkDarkThemeData();
                td(item);
            }
        }

        const observer = new MutationObserver(mutationCallback);
        observer.observe(document.documentElement, {attributes: true})


        return () => {
            // clean up the script when the component in unmounted
            observer.disconnect();
            document.getElementById("tradingView").remove();
        }
    }, [item]);

    return (
        <div className="home" id="home">
            <div className="home__hero container">
                <div className="home__hero__animation">
                    <MainAnimationHome/>
                </div>
                <div className="home__hero__content">
                    <h4>Prepare yourself to take a great leap forward</h4>
                    <p>Follow the stock market commentary and updates</p>
                    <div className="btn buttonJ buttonJ__tertiary buttonJ__rounded"
                         onClick={() => navigate(`/livestream`)}>Livestream
                    </div>
                </div>
            </div>
            <div className="home__tradingSteps container">
                <div className="home__tradingSteps__hero">
                    <h4>Learn the what, when and why of trading and
                        unlock your potential for super-performance</h4>
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__selection"
                     onClick={() => navigate(`/trading/selection`)}>
                    <BulbBlinking/>
                    <h6>What to Buy</h6>
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__timing"
                     onClick={() => navigate(`/trading/timing`)}>
                    <SandTimer/>
                    <h6>When to Buy</h6>
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__positionManagement"
                     onClick={() => navigate(`/trading/position-sizing`)}>
                    <SpinningHexagon/>
                    {/*<ForwardTriangle/>*/}
                    <h6>How much to Buy</h6>
                    {/*How many stocks to buy and how much of the portfolio percentage it should be. example of few 5%*/}
                    {/*positions stopping you out at once only results in tiny percentage off on the total portfolio.*/}
                    {/*How to add to positions(scaling in) if it goes right.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__managing"
                     onClick={() => navigate(`/trading/position-management`)}>
                    <ForwardTriangle/>
                    <h6>Manage Position</h6>
                    {/*<h4>Manage position once bought.</h4>*/}
                    {/*what to do when the position goes wrong. Good place to introduce staggered stops. How to rotate your*/}
                    {/*portfolio money from the weaker performing stocks to the best. how to really concentrate your positions*/}
                    {/*when everything goes well. how to parlay your profits to make bigger bets.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__selling"
                     onClick={() => navigate(`/trading/selling`)}>
                    <SpinningHexagon/>
                    <h6>
                        When to Sell
                    </h6>
                    {/*Selling into strength and selling when stocks starts trending down. It's voluntary selling vs*/}
                    {/*involuntary selling.*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__markethealth"
                     onClick={() => navigate(`/trading/market-health`)}>
                    {/*<Player src="https://assets10.lottiefiles.com/packages/lf20_xgdvjjxc.json" background="transparent"*/}
                    {/*        speed="1" style={{width: "80px", height: "80px"}} loop autoplay>*/}
                    {/*</Player>*/}

                    <MarketHealth/>
                    <h6>Market Health</h6>
                    {/*<h4>which depends on your own positions and some indicators like market*/}
                    {/*    breadth of advances and declines and percentage of stocks above their own 200d and 50 moving*/}
                    {/*    averages*/}
                    {/*</h4>*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__mindset"
                     onClick={() => navigate(`/trading/mindset`)}>
                    <Mindset/>
                    <h6>Mindset</h6>
                </div>
            </div>
        </div>
    );
}

export default Home;
