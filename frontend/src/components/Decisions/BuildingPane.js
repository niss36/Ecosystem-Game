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
        const {name, icon} = resources[id];

        return (<div key={id}><img src={icon} alt="" height={25}/> {name}: {amount}</div>);
    }

    makeEffect([id, effect]) {
        const {name, icon} = resources[id];

        let content;
        if (effect.income) {
            content = <> {name}: {effect.income >= 0 && "+"}{effect.income}/month</>;
        } else if (effect.max) {
            content = <> Max {name}: {effect.max}</>;
        }

        return (<div key={id}><img src={icon} alt="" height={25}/>{content}</div>);
    }

    render() {

        const {id, numberBuilt, effects, canBuy, buyOne, buyMany, remove, children} = this.props;

        const {name, description, costs} = buildings[id];

        let effectsPlane = <div/>;
        if(Object.entries(effects).length){
            effectsPlane = (<div className="BuildingPane-effects">
                                <div style={{textAlign: "center"}}>
                                        Effects
                                    </div>
                                    {
                                        effects && Object.entries(effects).map(this.makeEffect)
                                    }
                                </div>)
        }

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
                {effectsPlane}
                <div className="BuildingPane-footer">
                    <Button onClick={buyOne} disabled={!canBuy} variant="outlined" className="BuildingPane-buyOne">
                        Buy one
                    </Button>
                    <Button onClick={buyMany} disabled={!canBuy} variant="outlined" className="BuildingPane-buyMany" >
                        Buy many
                    </Button>
                    <Button onClick={remove} disabled={numberBuilt === 0} variant="outlined" className="BuildingPane-sell">
                        Remove
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
    buyOne: PropTypes.func,
    buyMany: PropTypes.func,
    remove: PropTypes.func,
    children: PropTypes.node,
};

export default BuildingPane;