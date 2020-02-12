import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import "./BuildingPane.css";

class BuildingPane extends React.Component {

    render() {

        const {name, numberBuilt, children, canBuy, onBuy, onSell} = this.props;

        return (
            <div className="BuildingPane-root">
                <div className="BuildingPane-content">
                    <div className="BuildingPane-header">
                        <span>{name} ({numberBuilt})</span>
                    </div>
                    <div className="BuildingPane-description">
                        {children}
                    </div>
                    <div className="BuildingPane-costs">
                        TODO Costs
                    </div>
                </div>
                <div className="BuildingPane-footer">
                    <Button onClick={onBuy} disabled={!canBuy} size="small" className="BuildingPane-buy">
                        Buy
                    </Button>
                    <Button onClick={onSell} disabled={numberBuilt === 0} size="small" className="BuildingPane-sell">
                        Sell
                    </Button>
                </div>
            </div>
        );
    }
}

BuildingPane.propTypes = {
    name: PropTypes.node,
    numberBuilt: PropTypes.number,
    children: PropTypes.node,
    canBuy: PropTypes.bool,
    onBuy: PropTypes.func,
    onSell: PropTypes.func,
};

export default BuildingPane;