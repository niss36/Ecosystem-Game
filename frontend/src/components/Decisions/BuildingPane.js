import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

import "./BuildingPane.css";

class BuildingPane extends React.Component {

    constructor(props) {
        super(props);

        this.makeEffect = this.makeEffect.bind(this);
    }

    makeEffect(effect, i) {
        return (
            <div key={i}>{effect.resource}: {effect.income >= 0 && "+"}{effect.income}/month</div>
        );
    }

    render() {

        const {building, extraEffects, numberBuilt, canBuy, onBuy, onSell, children} = this.props;

        const {name, description, costs, effects} = building;

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
                        costs.map((cost, i) => <div key={i}>{cost.resource}: {cost.amount}</div>)
                    }
                </div>
                <div className="BuildingPane-effects">
                    <div style={{textAlign: "center"}}>
                        Effects
                    </div>
                    {
                        effects.map(this.makeEffect)
                    }
                    {
                        extraEffects && extraEffects.map(this.makeEffect)
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
    building: PropTypes.any,
    numberBuilt: PropTypes.number,
    canBuy: PropTypes.bool,
    onBuy: PropTypes.func,
    onSell: PropTypes.func,
    children: PropTypes.node,
};

export default BuildingPane;