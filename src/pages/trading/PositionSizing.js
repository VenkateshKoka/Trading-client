import React from "react";
import {useNavigate} from "react-router-dom";

const PositionSizing = () => {
    const navigate = useNavigate();
    return (
        <div className="positionSizing container tradingPage">
            <div className="tradingPage__title">Position Sizing</div>
            <div className="tradingPage__content">
                At this point, You have selected the stocks already in an uptrend and further filtered fewer stocks that
                have formed bases and are about to break out. What's next? to achieve super-performance careful position
                sizing is required.
            </div>
            <div className="tradingPage__content">Position sizing refers to how much capital you will commit to a
                specific trade from your trading capital. It depends on the total trading amount and the
                current overall portfolio performance. If you are an individual investor, you should have no more than
                ten stocks at any time in your portfolio. Do not buy too many stocks thinking you are diversifying and
                spreading the
                risk. Diversification leads to too many assets in your portfolio, causing less attention to managing
                each position. Instead of exposing your capital to the best of the best stocks, money will be tied up in
                lesser-performing stocks resulting in poor portfolio performance.
            </div>
            <div className="tradingPage__content">
                Yes, it is risky to have a maximum of 10 stocks, and even one of the stocks can impact your performance
                if things go wrong. But with diligent position sizing, you can minimize the overall risk to your
                portfolio. Let's say you decided to have ten stocks at most, with each position worth 10% of your
                capital. Instead of buying a stock with 10% capital at once, start with a 5% position and if it is
                acting well(means the price moved up and your trade is profitable), then add the remaining 5% shares.
            </div>
            <div className="tradingPage__highlight">
                Remember the golden rule: Never add to your losers, and only put on additional shares if the stock is
                acting well and your trade is profitable.
            </div>
            <div className="tradingPage__content">
                Let's say you have $10,000 as your total trading capital. Start with allocating $500 for the initial
                buy, and then if the stock is acting well(means profitable), then bump your position to $1000. So, by
                this, even if you allocate $100 for ten stocks, you will only allocate your total $1000 only when trades
                are acting well. If things are not going your way, you will never expose your entire $1000 to the
                market.
                Furthermore, if your portfolio is not acting well(maybe there were more failures than successful
                trades recently), do not even allocate 5% at first. Maybe start with 2.5% position and bump it up to
                5% and then to 10%.
            </div>
            <div className="tradingPage__highlight">
                Expose your capital at best periods, and be out of the market when stocks aren't acting well.
            </div>
            <div className="tradingPage__content">
                Do not risk too much of your trading capital on a single trade. So how much is too much? Do not risk
                more than 1% of your portfolio on a single transaction. For example, of the $10,000 capital, do not risk
                more than $100 on a single trade. How do you implement that? - through stop-loss. Having a stop-loss is
                the most critical component of your trading system, which lets you protect your capital and not blow up
                your account.
            </div>
            <div className="tradingPage__content">
                If a stock goes down 8% from your buy point, you should be out of the trade, no questions asked. No
                other thinking or justification for the stock behavior is necessary at that point. It just means
                something is wrong, whether it be the stock selection, the timing of the buy, or maybe the overall
                market is
                correcting. It doesn't matter, get out first and analyze later on what went wrong.
            </div>
            <div className="tradingPage__highlight">
                Not getting out with a minor loss incurs huge losses and enables blowing up the trading confidence and
                the capital.
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