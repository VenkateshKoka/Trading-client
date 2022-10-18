import React from "react";
import {useNavigate} from "react-router-dom";

const MarketHealth = () => {
    const navigate = useNavigate();
    return (
        <div className="container tradingPage">
            <div>
                Market Health can be determined by using moving averages. Even better indicator would be the behaviour
                of stocks in your portfolio/watchlist(assuming you did shortlist the very best acting stocks).
            </div>
            <div>
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