import React from "react";
import {useNavigate} from "react-router-dom";

const Selling = () => {
    const navigate = useNavigate();
    return (
        <div className="container tradingPage">
            <div className="tradingPage__title">
                Selling
            </div>
            <div className="tradingPage__content">
                Once you place an order, the stock price may act well by moving up or fail the breakout by trending
                down. Both these scenarios require different strategies of selling.
            </div>
            <div className="tradingPage__highlight">
                Selling can be voluntary or involuntary.
            </div>
            <div className="tradingPage__content">
                Involuntary Selling: Before placing a trade, predefining the maximum risk on that trade is of utmost
                importance. The stop loss has to be determined before you enter the position, so there is less chance to
                hesitate to sell if stock moves against you. Whether the market is bearish, some bad news for that stock
                broke out, or the earnings report was disappointing - it does not matter. Get out. Do not reason that
                stock will bounce back(which may happen sometimes). No matter what, honor the stop-loss, because you
                never know how much a stock can drop. All the big losses start as smaller ones. Hoping the stock will
                recover is a dangerous game to play in the stock market. Cut the loss when it's small, and protect your
                trading and mental capital.
            </div>
            <div className="tradingPage__content">
                You can either have a stop-loss in memory and sell if the stock reaches the point or a stop loss order
                placed through your broker. I prefer the stop loss order placed through broker because my rational
                thinking may be affected when a stock goes down. I call this "Involuntary" selling as decision-making
                will be taken away once stop loss order is placed.
            </div>
            <div className="tradingPage__content">
                Voluntary selling consists of two methods. Selling into strength(when the stock price is still moving
                up) and selling into weakness(price is trending down).
            </div>
            <div className="tradingPage__content">
                Use staggered stops. Instead of a 5% stop loss on entire position, have a 3% stop on half and 8% stop on
                the other half. This will give more leeway to hold your position with the same risk, and if a stock
                rebounds you will atleast have half position
            </div>
            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/position-management`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>Manage Position</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/market-health`)}>
                        <div>Market Health</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Selling;