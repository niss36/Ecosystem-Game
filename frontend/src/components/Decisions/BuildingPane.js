import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import buildings from "../../definitions/Buildings";
import resources from "../../definitions/Resources";

import "./BuildingPane.css";

class BuildingPane extends React.Component {

    constructor(props) {
        super(props);

        this.makeCost = this.makeCost.bind(this);
        this.makeEffect = this.makeEffect.bind(this);
    }

    makeCost([id, amount]) {
        const {name} = resources[id];

        return (<div key={id}>{name}: {amount}</div>);
    }

    makeEffect([id, effect]) {
        const {name} = resources[id];

        return (<div key={id}>{name}: {effect.income >= 0 && "+"}{effect.income}/month</div>);
    }

    render() {

        const {id, numberBuilt, effects, canBuy, onBuy, onSell, children} = this.props;

        const {name, description, costs} = buildings[id];

        return (
            <div className="BuildingPane-root">
                <div className="BuildingPane-header">
                    <span>{name} ({numberBuilt})</span>
                </div>
                <div className="BuildingPane-description">
                    {description}
                </div>
                {children && (
                    <div className="BuildingPane-extra">
                        {children}
                    </div>
                )}
                <div className="BuildingPane-costs">
                    <div style={{textAlign: "center"}}>
                        Costs
                    </div>
                    {
                        Object.entries(costs).map(this.makeCost)
                    }
                </div>
                <div className="BuildingPane-effects">
                    <div style={{textAlign: "center"}}>
                        Effects
                    </div>
                    {
                        effects && Object.entries(effects).map(this.makeEffect)
                    }
                </div>
                <div className="BuildingPane-footer">
                    <Button onClick={onBuy} disabled={!canBuy} variant="outlined" className="BuildingPane-buy" >
                        Buy
                    </Button>
                    <Button onClick={onSell} disabled={numberBuilt === 0} variant="outlined" className="BuildingPane-sell">
                        Sell
                    </Button>
                </div>
            </div>
        );
    }
}

BuildingPane.propTypes = {
    id: PropTypes.string,
    numberBuilt: PropTypes.number,
    effects: PropTypes.any,
    canBuy: PropTypes.bool,
    onBuy: PropTypes.func,
    onSell: PropTypes.func,
    children: PropTypes.node,
};

export default BuildingPane;