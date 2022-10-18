import React from "react";
import {useNavigate} from "react-router-dom";

const PositionSizing = () => {
    const navigate = useNavigate();
    return (
        <div className="positionSizing container tradingPage">
            <div className="tradingPage__title">This is position sizing page and Risk management</div>
            <div className="tradingPage__content">Position sizing is how much of your capital is allocated to each
                trade.
            </div>
            <div className="tradingPage__content">Position sizing depends on your total trading capital, how your
                overall portfolio is performing. If you
                are an individual investor with moderate capital, then you should have no more than 10 stocks in your
                portfolio. Do not buy too many stocks thinking you are diversifying. Diversification leads to too many
                stocks in your portfolio and less attention is paid to manage each one position. This also causes lesser
                performance as instead of exposing your capital to the best of the best stocks, you would tie up your
                capital is lesser performing stocks.
            </div>
            <div className="tradingPage__content">
                Yes, it is risky to only have maximum of 10 stocks and any one of the stocks can have significant
                impact if things go wrong. But with meticulous position sizing, you can minimize the overall risk to
                your portfolio. Let's say you decided to have 10 stocks at most, with each position worth 10% of your
                capital. Instead of purchasing a stock with 10% capital, start with a 5% position and if it is acting
                well(means stock moved up and is profitable), then add more shares to your position. Remember the golden
                rule, never add to your losers, and add only if the stock is acting well and your trade is profitable.
                Let's say you have $10,000 as your total trading capital. Start with allocating $500 for the initial buy
                and then if the stock is acting well(means profitable), then bump your position to $1000. So, by this,
                even if your allocate $100 for 10 stocks, you will only allocate your full $1000 only when trades are
                acting well. If things are not going your way, you would never expose your total $1000 to the market. By
                this process, the capital is fully invested only when your portfolio is acting well.
            </div>
            <div className="tradingPage__content">
                Furthermore, if your portfolio is not acting well(maybe there are more failure than successful
                trades recently), do not even allocate 5% at first. Maybe start with 2.5% position and then bump it to
                5% and then to 10%.
            </div>
            <div className="tradingPage__content">
                Do not risk too much of your trading capital on a single trade. So how much is too much? Do not risk
                more than 1% of your portfolio on a single trade. That means, of the $10,000 capital, do not risk more
                than $100 on a single trade. How do you implement that? - through stop-loss. This is the single most
                important component of your trading system, that let's you protect your capital and not blow your
                account. Legendary investor William O'neal had a hard-rule of having a max stop-loss of 8%. If a stocks
                your purchased goes down 8%, you should be getting out of the trade. No other thinking or justification
                for the stock behavior is to be made at that point. It just means something is worng. Whether it be the
                stock selection or your timing timing or may be the overall market is correcting. Doesn't matter, get
                out and analyze later on what went wrong. Not getting out at a small loss incurs huge losses and enables
                blowing up the trading confidence and the capital.
            </div>
            <h1>Minervini's risk and loss vs profit and how it affects the portfolio.</h1>
            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/timing`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>When to Buy</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/position-management`)}>
                        <div>Manage Position</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PositionSizing;