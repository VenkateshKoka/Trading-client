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
                What next? To stay in the position or not, maximize profits while minimizing risk to your portfolio.
            </div>
            <div className="tradingPage__content">
                You can have as few as 4 stocks in your portfolio with a 25% position each. But this requires a
                technique called Progressive exposure(explained below). The secret to compounding your capital rapidly
                is to buy stocks that are moving up fast, while at the same time reducing risk to the overall portfolio
                while increasing your position.
            </div>
            <div className="tradingPage__content">
                I have, and some professionals I know of, who traded even 50% - 100% of their portfolio in a single
                trade. But this requires an extremely tight stop loss and very liquid stock or index ETF. The overall
                maximum risk on trade remains at 1%. So on a 10% position, you can have a 10% stop loss to maintain the
                1% risk on the portfolio. When you have a 50% position, a 2% stop is required, and with 100%, a 1% stop.
                This is only done in rare cases where a setup offers an asymmetrical risk/reward ratio. Don't ever hold
                these positions overnight, as gap-downs that are more than your stop-loss occurs and thereby making the
                stop-loss useless.
            </div>
            <div className="tradingPage__content">
                There is no guarantee that even buying the best stocks with precise timing on breakouts will result in
                profitable trades. Just that the probability of a profitable trade is higher. There are three scenarios
                post-buy:
                <ol>
                    <li>The stock stays there in a range and does not have much progress.</li>
                    <li>The stock pulls back after you buy and is at a loss. This scenario requires the knowledge of
                        whether the action is common or uncommon.
                    </li>
                    <li>The price moves up for the next 2-3 days, and the position is in profit.
                    </li>
                </ol>
            </div>
            <div className="tradingPage__content">
                If the stock stays in a range without any progress, you can either wait for it to push higher or reduce
                the position / sell altogether to buy other stock that is behaving better. You do not have to tie your
                capital in a stagnant stock when the other are acting well.
            </div>
            <div className="tradingPage__content">
                The stock pulled back: A stock price pulling back after a breakout is a common action. But staying there
                is not. The price has to rebound immediately to push higher. You can allow some time for the stock to
                show its potential. If it doesn't rebound, reduce the position(if the stock hits your stop-loss, you get
                out of the trade immediately anyway).
            </div>
            <h1>-------------Image of rebound after squatting -----------------------</h1>
            <div className="tradingPage__content">
                To stay in the trade, the stock has to be in profit immediately(price moving up the next 2-3days with
                increased volume) and without pulling back much. Maximum attention has to be paid to the price action in
                the first few days. It's better if the price never came back to the breakout level, but it is very
                common for a stock to revisit the breakout price level and turn up and move higher. You can certainly
                add to a position if the stock starts turning up after a pull-back.
            </div>
            <h1>-------------Image of turning up after pull-back -----------------------</h1>
            <div className="tradingPage__content">
                Also as the stock price moves up, you can increase the position size and offset the risk with your
                profit. Let's say you bought a stock at $100 with 5% of your overall portfolio and it moves up to $106
                (3% profit), you can bump your position to 10%. Your risk doubled, but the profit offsets it. If the
                stock turns back, you can decrease the position immediately at the break-even price and your original 5%
                with initial risk. But if the stock moves up after increasing the position, it will be like doubling the
                profit potential without additional risk.
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