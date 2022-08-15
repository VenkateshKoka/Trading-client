import React, {useState, useContext, useEffect} from "react";
import {useQuery, useLazyQuery, useSubscription} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useNavigate} from "react-router-dom";
import {GET_ALL_POSTS, NUMBER_OF_POSTS} from "../graphql/queries";
import {POST_ADDED, POST_UPDATED, POST_DELETED} from "../graphql/subscriptions";
import PostCard from "../components/PostCard";
import {toast} from "react-toastify";
import Lottie from "lottie-react";

import ForwardTriangle from "../components/animations/ForwardTriangle";
import SpinningHexagon from "../components/animations/SpinningHexagon";
import BulbBlinking from "../components/animations/BulbBlinking";
import SandTimer from "../components/animations/SandTimer";

import mainAnimation from '../assets/homepage_main_lf20_xwrbzebb.json';
import marketHealthAnimation from '../assets/91145-health-insurance.json';
import mindsetAnimation from '../assets/98369-thinking-colors-adapted.json';
import DarkMode from "../components/DarkMode";
import {stringifyForDisplay} from "@apollo/client/utilities";

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
                    <Lottie animationData={mainAnimation}
                            style={{width: "100%", height: "100%", opacity: "0.9"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                </div>
                <div className="home__hero__content">
                    <h1>Unlock your Trading potential</h1>
                </div>
            </div>
            <div className="home__tradingSteps container">
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
                    <Lottie animationData={marketHealthAnimation}
                            style={{width: "70px", height: "70px"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                    <h6>Market Health</h6>
                    {/*<h4>which depends on your own positions and some indicators like market*/}
                    {/*    breadth of advances and declines and percentage of stocks above their own 200d and 50 moving*/}
                    {/*    averages*/}
                    {/*</h4>*/}
                </div>
                <div className="home__tradingSteps__step home__tradingSteps__mindset"
                     onClick={() => navigate(`/trading/mindset`)}>
                    <Lottie animationData={mindsetAnimation}
                            style={{marginTop: "-20px", width: "80px", height: "80px"}}
                            background="transparent"
                            speed={1}
                            loop={true}
                            autoplay={true}
                    />
                    <h6>Mindset</h6>
                </div>
            </div>
        </div>
    );
}

export default Home;
