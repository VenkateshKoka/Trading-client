import React from "react";
import {useNavigate} from "react-router-dom";

const MarketHealth = () => {
    const navigate = useNavigate();
    return (
        <div className="container tradingPage">
            <div className="tradingPage__content">
                Market Health can be determined by using moving averages. Even better indicator would be the behaviour
                of stocks in your portfolio/watchlist(assuming you did shortlist the very best acting stocks).
            </div>
            <div className="tradingPage__content">
                One thing to note is that a market index going uo doesn't mean, the stocks in your watchlist will
                perform well or vice versa. The probability is higher, that's it. Many market tops consists of very few
                stocks propping up the index, but most of the stocks will be declining underneath the surface. Keep of
                the new highs/lows number as it determines how many stocks are making a new high vs how many are making
                a new low. When there is a consistent trend of new highs, there are breakouts that are working and
                making new high and it's similar to stocks making new low.
            </div>
            <div className="tradingPage__content">
                So, the ultimate indicator is your portfolio/watchlist. If the stocks in your portfolio are having pivot
                failures or base failures, the market is suggesting yu something. This is not the right time for buying
                breakouts or increasing the positions. Scale back when this happens. Conversely, if the stock breakouts
                are holding up and the stock follows through(means continuing the breakout with minimal pullback or
                going up again after pullback), it's time to step up the buying/adding to positions.
            </div>
            <div className="tradingPage__content">
                The market conditions based on Moving averages will have 2 parts. Whether the index is above or below
                the moving average and whether the moving average itself is in an uptrend or an downtrend. In some
                timelines, Exponential M.A is used and Simple MA for other. This is based on my opinion on which one
                works better

                Short term: 5 SMA.

                Intermediate Term: 21 EMA.

                Mid Term: 50 SMA.

                Long-term: 200 SMA.
            </div>

            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/selling`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>Selling</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/mindset`)}>
                        <div>Mindset</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default MarketHealth;