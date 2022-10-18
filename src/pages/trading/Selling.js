import React from "react";
import {useNavigate} from "react-router-dom";

const Selling = () => {
    const navigate = useNavigate();
    return (
        <div className="selling container tradingPage">
            <h1>This is selling page</h1>
            <p>The selling point has to be determined before you enter a trade, so that less chance to hesitate to sell
                if stock moves against you. No matter what, honor your stop loss rule, because you never know how much a
                stock can drop. All big losses start as smaller ones.</p>
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