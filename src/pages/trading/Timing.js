import React from "react";
import SandTimer from "../../components/animations/SandTimer";
import {useNavigate} from "react-router-dom";

const Timing = () => {
    const navigate = useNavigate();
    return (
        <div className="tradingPage container">

            <div className="tradingPage__title">How to time your buys(entries) and learn the chart bases.</div>
            <div className="tradingPage__highlight">
                <SandTimer/>
                Every stock you buy has to be in an uptrend, but you do not purchase every stock in an uptrend.
            </div>
            <div className="tradingPage__content">
                So which stocks to consider and which stocks to ignore in an uptrend?
                You have to execute a trade when there is a high probability of the stock price moving up, and in
                addition to moving up, doing it in a short amount of time. Often referred to as a pivot point.
                Sometimes the stock may go lower rapidly, called a pivot failure, but you get to know the result quickly
                instead of tying up your capital for a long time without much progress. To understand a Pivot, first let
                us understand the price action.
            </div>
            <div className="tradingPage__content">
                Buying demand for a stock
                causes its price to rise, and selling pressure causes its price to fall. The
                higher this demand, the higher the rise, and persistent demand mean a better chance to continue its
                upward move. But how to know if there is high demand or not? - trading volume determines that. A big
                move up in price accompanied by higher than average volume(sometimes multiple times) suggest
                institutional investors are interested. Similarly, when stock pullbacks on lower volume than average
                indicate the selling pressure is low. These two properties - higher volume during a price advance and
                lower volume during a pullback, are needed for a price advance to settle and prepare for the next
                move-up.
            </div>
            <div className="tradingPage__content">
                When a stock is in a stage 2 uptrend, there will be pullbacks and basing periods (caused by profit
                taking or market corrections)
                <br/>
                <b>Pullback</b> - Once a stock price moves up, inevitably, there would be some sellers to take profits
                causing the price to pull back. Pullbacks are part and parcel of the game, but the extent of the
                pullback is significant. Imagine a stock moved from 100 to 150. Now, if the stock pulls back to 110,
                most of the buying is negated by selling. In another scenario, the same stock only comes back to 140,
                meaning the stock is acting well and there are fewer sellers. This process of selling and price bouncing
                back-up usually happens multiple times and over a period of time. This period is called basing period or
                simply referred as base.
            </div>
            <div className="tradingPage__content">
                <b>Base / basing period</b> - bases are formed when the sellers in the stock dry up over a period of
                time. Instead of one pullback, a stock usually goes through multiple pullbacks until all the sellers are
                exhausted. These most commonly last from 5 to 26 weeks (but some cases it
                may take more months and even more than a year - the more the basing period, the more powerful the
                breakout).
            </div>
            <div className="tradingPage__highlight">
                <SandTimer width="40px"/>
                The goal is to sell your stock higher than you paid for, in the shortest period.
            </div>
            <div className="tradingPage__content">
                Once the sellers are exhausted and only the buyers remain(we conclude there are buyers because the stock
                is already in an uptrend), then even a small amount of buying can result in
                a rapid appreciation of price. This is called a pivot point, where there are no sellers(trading volume
                will be very low and low volatility in price movement). The goal is to find this pivot point and buy
                when a stock breaks out from this pivot.
            </div>
            <div className="tradingPage__content">
                <h2> Add pics of great volume breakout pics and rebounding and duds ---jaffa </h2>
            </div>
            <div className="tradingPage__image">
                <img src={require('../../assets/trading/TSLA_VCP_EXPLANATION.png')}/>
            </div>
            <div className="tradingPage__content">
                <ul>
                    <li>A-B is the first pullback(around 35%) and bounce. If a stock has strong demand, the pullback
                        percent will be even lower and ideally it's less than 15%. But during Feb-Mar 2021, all tech
                        stocks pulled-back even more, some even greater than 60%. When the market conditions are bad,
                        relative strength of the pullbacks are to be considered. Note that the price do not have to
                        reach the prior high i.e A. It's better if the price level of B is nearer to A.
                    </li>
                    <li>B-C is the second pullback and bounce. Note that this pullback is lesser in percentage compared
                        to A-B. This is because of reduced selling pressure and some selling is absorbed during A-B.
                    </li>
                    <li>C-D with even less price correction compared to B-C. C-D also made a higher low compared to the
                        low of B-C. This is a sign that buyers are persistent and gaining control. Usually after 3
                        pullbacks and bounces the stock may breakout. Most of the times it will be between 3-5 bounces.
                        Studying breakouts from history will certainly help you understand this more.
                    </li>
                    <li>D-E price action is very tight. The pullback is lower and also the daily trading volatility of
                        the stock is considerably lower.
                    </li>
                    <li>E-F and F-G areas are explained in the image below. Price volatility is negligible and breakout
                        pivots are identified. The lack of volume on days of price pullbacks and volume surging on
                        breakout days. Here the volume is above average, but in many cases volume can be 1.5 times or
                        even higher. <b>Higher the volume on breakout days, the better.</b>
                    </li>
                </ul>
            </div>
            <div className="tradingPage__image">
                <img src={require('../../assets/trading/TSLA_VCP_BREAKOUT.png')}/>
            </div>

            <h1> Everything from Base counting and different base structures need their own pages and detailed
                explanations.
            </h1>
            <div>Generally a stock tops after 3-5 bases in the stage 2 uptrend. The later basing periods
                become obvious with more volatility and eventually institutional demand dries up. Bases 1 and 2
                generally comes off market correction, which is the best time to buy.
            </div>


            <div className="tradingPage__content">There are different types of bases: cup with a handle, Saucer with a
                handle, double bottom, flat-base,
                square box, high tight flags.
            </div>

            <h3>Powerplays / High tight flags</h3>
            <div className="tradingPage__content">Characteristics of a high tight flag:
                <br/>
                1. A rare pattern usually seen during a bull market year.
                <br/>
                2. Usually a little known company, not widely known and certainly not the largest company in its
                industry.
                <br/>
                3. Company has a new product that turns the not so well known stock into one that runs up rapidly, 100
                to 120% or more in only 4 to 8 weeks and holds most of the huge gain while it moves sideways 3 to 5
                weeks and corrects between just 10 to 25%
            </div>

            <div className="tradingPage__content">A “high, tight flag” price pattern is rare, occurring in no more than
                a few stocks during a bull market.
                It begins with the stock moving generally 100% to 120% in a very short period of time (four to eight
                weeks). It then corrects sideways no more than 10% to 25%, usually in three, four, or five weeks. This
                is the strongest of patterns, but it’s also risky and difficult to interpret correctly.
            </div>
            <div className="tradingPage__content">
                cup with handles:

                Cup patterns can last from 7 weeks to as long as 65 (sometimes even more than that) weeks, but most of
                them
                last for three to six months.
                The usual correction from the absolute peak (the top of the cup) to the low point (the bottom of the
                cup) of
                this price pattern varies from around the 12% to 15% range to upwards of 33%. A strong price pattern of
                any
                type should always have a clear and definite price uptrend prior to the beginning of its base pattern.
                You
                should look for at least a 30% increase in price in the prior uptrend, together with improving relative
                strength and a substantial increase in trading volume at some points in the prior uptrend.

                When handles do occur, they almost always form in the upper half of the overall base structure, as
                measured
                from the absolute peak of the entire base to the absolute low of the cup. The handle should also be
                above
                the stock’s 10-week moving average price line. Handles that form in the lower half of an overall base or
                completely below the stock’s 10-week line are weak and failure-prone. Additionally, handles that
                consistently wedge up (drift upward along their price lows or just go straight sideways along their lows
                rather than drifting down) have a much higher probability of failing when they break out to new highs.
                This
                upward-wedging behavior along low points in the handle doesn’t let the stock undergo the needed shakeout
                or
                sharp price pullback after having advanced from the low of the base into the upper half of the pattern.
                This
                high-risk trait tends to occur in third- or fourth-stage bases, in laggard stock bases, or in very
                active
                market leaders that become too widely followed and therefore too obvious. You should beware of wedging
                handles.

                When a stock forms a proper cup-with-handle chart pattern and then charges through an upside buy point,
                which Jesse Livermore referred to as the “pivot point” or “line of least resistance,” the day’s volume
                should increase at least 40% to 50% above normal. During major breakouts, it’s not uncommon for new
                market
                leaders to show volume spikes 200%, 500%, or 1,000% greater than the average daily volume.

            </div>
            <div className="tradingPage__content">
                Pivot buy points in correct chart base patterns are not typically based on a stock’s old high price.
                Most of
                them occur at 5% to 10% below the prior peak. The peak price in the handle area is what determines most
                buy
                points, and this is almost always somewhat below the base’s actual high. This is crucial to
                remember.
                If you wait for an actual new high price, you will often buy too late. Sometimes you can get a slight
                head
                start by drawing a downtrend line from the overall pattern’s absolute peak downward across the peak
                where
                the stock begins building the handle. Then begin your purchase when the trend line is broken on the
                upside a
                few weeks later. However, you have to be right in your chart and stock analysis to get away with this.
            </div>
            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/selection`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>What to Buy</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/position-sizing`)}>
                        <div>How much to Buy</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Timing;