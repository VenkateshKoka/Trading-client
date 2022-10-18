import React from "react";
import {useNavigate} from "react-router-dom";

const Mindset = () => {
    const navigate = useNavigate();
    return (
        <div className="container tradingPage">
            <h1>This is mindset page</h1>
            <div className="tradingPage__navigation">
                <div className="tradingPage__navigation__prevPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/market-health`)}>
                        <div><i className="fas fa-backward"></i></div>
                        <div>Market Health</div>
                    </div>
                </div>
                <div className="tradingPage__navigation__nextPage">
                    <div className="buttonJ buttonJ__tertiary buttonJ__rounded buttonJ__small"
                         onClick={() => navigate(`/trading/selection`)}>
                        <div>What to Buy</div>
                        <div><i className="fas fa-forward"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Mindset;