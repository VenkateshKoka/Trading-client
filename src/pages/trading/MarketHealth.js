import React from "react";

const MarketHealth = () => {
    return (
        <>
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
        </>

    )
};

export default MarketHealth;