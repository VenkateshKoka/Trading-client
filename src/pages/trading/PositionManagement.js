import React from "react";
import {useNavigate} from "react-router-dom";

const PositionManagement = () => {
    const navigate = useNavigate();
    return (
        <div className="positionManagement container tradingPage">
            <div className="tradingPage__title">
                Position Management
            </div>
            <div className="tradingPage__content">
                At this point, You have bought the stocks that are in an uptrend and are breaking out from proper bases.
                What's next? To stay in the position to maximize profits while minimizing risk to your portfolio.
            </div>
            <div className="tradingPage__content">
                Managing a position consists of two scenarios.
                <ul>
                    <li>
                        The price moves up. You need to know when to take profits and how much to sell.
                    </li>
                    <li>
                        The stock pulls back after you buy and is at a loss. This scenario requires the knowledge of
                        When to sell and how much to sell.
                    </li>
                    <li>
                        The stocks just stays there in a range and doesn't have much progress.
                    </li>
                </ul>
            </div>
            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/position-sizing`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>How Much to Buy</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/selling`)}>
                        <div>Selling</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PositionManagement;