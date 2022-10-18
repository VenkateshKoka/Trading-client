import React from "react";
import {useNavigate} from "react-router-dom";

const PositionManagement = () => {
    const navigate = useNavigate();
    return (
        <div className="positionManagement container tradingPage">
            <h1>This is position management page
            </h1>
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