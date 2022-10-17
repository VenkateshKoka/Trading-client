import React, {Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import BulbBlinking from "../../components/animations/BulbBlinking";
import Button from "../../components/Button";

const Selection = () => {
    const navigate = useNavigate();
    return (
        <div className="container tradingPage">
            <div className="tradingPage__title">
                What stocks to buy to achieve big returns
            </div>
            <div className="tradingPage__content">
                The goal of trading or investing is to compound your capital quickly without taking unnecessary risks.
                Although
                there are many financial markets like stocks, futures, bonds, market indices, precious metals, and
                currencies. we will be learning about achieving super-performance by trading stocks without substantial
                risk to your financial and mental capital.
            </div>
            <div className="tradingPage__highlight">
                <BulbBlinking/>
                Buy stocks which are already in an uptrend
            </div>
            <div className="tradingPage__content">
                Most retail investors follow the "buy low, sell higher" rule and buy a stock when its price falls. Let
                us carefully examine the first part - "Buy low" doesn't necessarily mean to buy a stock when its price
                is at a discount. Although this strategy may work in some situations, many investors incur huge losses
                by buying stocks in a downtrend. For example, a stock drops from $100 to $50, and you bought some shares
                thinking the price may not go any lower. The stock price may recover and start trending up, but what if
                it drops to $40? Do you buy more shares and average down? What if the stock price further plummets to
                $20? No matter how good a company is, its stock price can still go lower. Stock market history provides
                many instances where stocks of once great companies went to Zero, and averaging down will wipe out your
                capital.
            </div>
            <div className="tradingPage__content">
                Imagine you are running a fashion boutique with ten green and ten red dresses in the store. For whatever
                reason, consumers are eagerly buying red dresses compared to green ones. Now, if you want to re-stock
                your store, which dresses would you order more - green or red? The red ones, because they are in huge
                demand and selling out quickly. And what happens to the existing green dresses in the store? - you would
                offer a discount to sell out the low-demand merchandise to make space for the ones in high demand(red).
                Similar to the fashion boutique situation, as a stock trader, the goal is to buy stocks having high
                demand and sell them for a higher price to book profits. But, the price of a product with high demand
                will never go from $100 to $50. Instead, it will be trending upwards to greater than $100. That's why
                you don't buy stocks in a price downtrend. A downtrend implies lower demand. Change your mindset to
                follow the "buy high, sell higher" rule. Buy high means looking for stocks that are in an uptrend.
            </div>
            <div className="tradingPage__content"> So what does stock in a downtrend or an uptrend means?
                All stocks have four stages in their lifecycle.
                <div className="tradingPage__content">
                    <div className="tradingPage__content">
                        <strong>Stage 1</strong> : Basing or accumulation period where institutional investors
                        slowly begin acquiring positions in a stock. The stock price will be range bound for months, or
                        in some cases, years. Moving averages will be almost flat. The stock may be at a bargain, but it
                        is not wise for an individual investor to initiate position as the price may not increase for a
                        long time, tying up your money which can invested in other names.
                    </div>
                    <div className="tradingPage__content">
                        <strong>Stage 2</strong> : The advancing or uptrend phase is when the stock price
                        breaks
                        out of the
                        accumulation phase price range accompanied by huge volume. The moving averages will be turning
                        up, and this is the ideal time to buy a stock. Most of the trading profits are made in this
                        stage 2 uptrend.
                    </div>
                    <div className="tradingPage__content">
                        <strong>Stage 3</strong> : The topping or distribution phase is when institutional
                        investors start
                        unwinding their positions. The stage 2 uptrend loses momentum, price action begins to
                        move sideways, and volume picks up as the bulls and bears fight for control.
                    </div>
                    <div className="tradingPage__content">
                        <strong>Stage 4</strong> : Declining or downtrend occurs as the remaining investors
                        rush to liquidate their positions. Volatility often increases even more during this phase.
                    </div>
                    <Fragment>
                        <strong>
                            If you avoid buying/averaging down stocks in stage 4 decline and only purchase stocks
                            which are in stage 2 uptrend, your results will improve significantly.
                        </strong>
                    </Fragment>
                </div>
            </div>
            <div className="tradingPage__highlight">
                <BulbBlinking/>
                Accelerated earnings per share
            </div>
            <div className="tradingPage__content">
                So what causes an increased demand for a stock. In our fashion boutique situation, maybe the consumers
                prefer the red dresses because of the color red or the fitting or the fabric is softer. So what
                attributes of the stock drive the demand? Significant increase in recent one or two quarterly Earnings
                Per Share(EPS) compared to the prior year's same quarter(s) is the single most important element in
                stock selection. The greater the percentage increase, the better. Look for accelerating quarterly
                earnings growth, it’s not only the eps growth, but the rate of eps growth(earning’s surprises) that
                causes big stock price moves.Investors Business Daily concluded that 75 percent of the best-performing
                stocks from 1952 to 2001 showed earnings increases averaging more than 70% in the recent quarter before
                they began price advances. The best companies show earnings up 100% to 500% or more! A mediocre 10% or
                12% increase is not enough. When picking winning stocks, it's the bottom line that counts.
            </div>
            <div className="tradingPage__highlight">
                <BulbBlinking/>
                Accelerated Revenue growth
            </div>
            <div className="tradingPage__content"> Even though the EPS growth of companies is the best metric, not all
                growth rates are the same. Companies
                can still inflate earnings for a few quarters by reducing costs or spending less on advertising,
                research and development, and other constructive activities. Earnings growth accompanied by higher sales
                validates the quality of earnings. Annual revenue growth with accelerated earnings growth is the best
                criteria for finding super-performance stocks. Make sure to select stocks with 25% to 50% and higher
                annual revenue growth rates.
            </div>
            <div className="tradingPage__highlight">
                <BulbBlinking/>
                High Relative Strength
            </div>
            <div className="tradingPage__content">
                Relative Strength measures the stock performance relative to the stock market as a whole. The average RS
                Rating of the best performing stocks from the early 1950s through 2008, before their major run-ups was
                87(means the stocks are in top 87 percentile). In other words, the best stocks were already
                doing better than nearly 9 out of 10 others when they were starting out on their most explosive advance
                yet. So the rule for those who are determined to be big winners in the stock market is: look for the
                genuine leaders and avoid laggards and sympathy plays. Don’t buy stocks with Relative Strength Ratings
                in the 40s, 50s, or 60s.
            </div>
            <div className="tradingPage__content">
                <span>
                    <a className="externalWebsiteLink" href="https://www.minervini.com/about.php" target="_blank"
                       rel="noopener noreferrer"><strong><em>Mark Minervini</em></strong></a>, U.S investing champion(1997 & 2021),
                    have created a trend template to search for
                    up-trending stocks. The screening templates are available at the
                    <a className="externalWebsiteLink" href="https://marketsmith.investors.com/" target="_blank"
                       rel="noopener noreferrer"> MarketSmith website</a>.
                </span>
                <div className="tradingPage__content">
                    <ol>
                        <li>
                            <div>The current stock price is above both the 150-day (30-week) and the 200-day
                                (40-week) moving average price lines.
                            </div>
                        </li>
                        <li>
                            <div>The 150-day moving average is above the 200-day moving average.</div>
                        </li>
                        <li>
                            <div>The 200-day moving average line is trending up for at least 1 month (preferably
                                4–5 months minimum in most cases).
                            </div>
                        </li>
                        <li>
                            <div>The 50-day (10-week) moving average is above both the 150-day and 200-day
                                moving averages.
                            </div>
                        </li>
                        <li>
                            <div>The current stock price is trading above the 50-day moving average.</div>
                        </li>
                        <li>
                            <div>The current stock price is at least 30 percent above its 52-week low. (Many of
                                the best selections will be 100 percent, 300 percent, or greater above their
                                52-week low before they emerge from a solid consolidation period and mount
                                a large scale advance.)
                            </div>
                        </li>
                        <li>
                            <div>The current stock price is within at least 25 percent of its 52-week high (the
                                closer to a new high the better).
                            </div>
                        </li>
                        <li>
                            <div>The relative strength ranking (as reported in Investor’s Business Daily) is no
                                less than 70, and preferably in the 80s or 90s, which will generally be the case
                                with the better selections.
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="tradingPage__content">
                MarketSmith already provides stock screeners with the above mentioned criteria. Stock Screens used by
                Mark Minervini are :
                <ul>
                    <li>
                        <div>Minervini trend template 5 month</div>
                    </li>
                    <li>
                        <div>Minervini trend template 1 month</div>
                    </li>
                    <li>
                        <div>RS line Blue dot — stocks making new Relative Strength high and breaking out.</div>
                    </li>
                </ul>
            </div>
            <div className="tradingPage__content"> To conclude, You should buy stocks when they’re on the way up in
                price, not on the way down. And when you buy more, you do it only after the stock has risen from your
                purchase price, not after it has fallen below it.
            </div>
            <div className="tradingPage__nextPage">
                <div className="buttonJ buttonJ__tertiary buttonJ__rounded"
                     onClick={() => navigate(`/trading/timing`)}>
                    <div>Next: When to Buy</div>
                    <div><i className="fas fa-forward"></i></div>
                </div>
            </div>
        </div>
    );
};

export default Selection;