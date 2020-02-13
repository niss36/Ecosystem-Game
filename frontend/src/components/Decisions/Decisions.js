import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import MuiSlider from "@material-ui/core/Slider";

import TabsPane from "../util/TabsPane";
import BuildingPane from "./BuildingPane";
import {buildings} from "./Buildings";
import {buyBuilding, sellBuilding, setEffort} from "../../actions";

import "./Decisions.css";

const mapStateToProps = (state, ownProps) => {
    return {
        ...state[ownProps.id],
        canBuy: true, // TODO update based on available resources / space on the map
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBuy: () => dispatch(buyBuilding(ownProps.id)),
        onSell: () => dispatch(sellBuilding(ownProps.id)),
    }
};

const ConnectedBuildingPane = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingPane);

function MakeBuildingPane({id, children, ...props}) { // TODO get rid of obsolete args
    return (
        <ConnectedBuildingPane id={id} building={buildings[id]} {...props}>
            {children}
        </ConnectedBuildingPane>
    );
}

function MakeFishingBoatPane() {

    const id = "fishingBoat";

    // TODO don't do this on every render
    const ABuildingPane = connect(
        mapStateToProps,
        (dispatch, ownProps) => {
            return {
                onBuy: () => dispatch(buyBuilding(ownProps.id)),
                onSell: () => dispatch(sellBuilding(ownProps.id)),
                onSetEffort: (e, v) => dispatch(setEffort(ownProps.id, v))
            }
        }
    )(props => {
        return (
            <BuildingPane {...props} extraEffects={[{resource: "food", income: props.effort}]}>
                <div style={{textAlign: "center"}} id="fish-effort-slider">
                    Effort
                </div>
                <MuiSlider value={props.effort} onChange={props.onSetEffort} aria-labelledby="fish-effort-slider"/>
            </BuildingPane>
        )
    });

    return <ABuildingPane id={id} building={buildings[id]}/>
}

class Decisions extends React.Component {

    objectPlaceholder = {
        icon: 'unknown.svg',
        income: 0,
        cost: 100,
        killRate: 10,
        cellNo: 0
    };

    render() {

        const {onNextTurn, onDecisionStuff} = this.props;

        const tabs = ["Food", "Forestry", "Population"];

        return (
            <div className="Decisions-root panel">
                <TabsPane variant="scrollable" tabs={tabs}>
                    {/*Food*/}
                    <div>
                        {/*Agriculture*/}
                        <MakeBuildingPane id="animalFarm"/>

                        {/*Fisheries*/}
                        <MakeFishingBoatPane/>

                        {/*Hunting*/}
                        <MakeBuildingPane id="huntingShack"/>
                    </div>

                    {/*Forestry*/}
                    <div>
                        <MakeBuildingPane id="cheapLumberMill"/>
                        <MakeBuildingPane id="expensiveLumberMill"/>
                    </div>

                    {/*Population*/}
                    <div>
                        <div>
                            <div style={{textAlign: "center"}}>
                                Tax
                            </div>
                            <MuiSlider value={100}/>
                        </div>
                        <ul>
                            <li>
                                Taxes
                                <ul>
                                    <li>Main source of money</li>
                                    <li>Slider: balance amount of tax and happiness</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </TabsPane>
                <div className="filler"/>
                <div className="Decisions-nextTurn">
                    <Button onClick={onNextTurn} size="large" fullWidth startIcon={<PlayArrow/>}>Next turn</Button>
                </div>
            </div>
        );
    }
}

Decisions.propTypes = {
    onNextTurn: PropTypes.func,
    onDecisionStuff: PropTypes.func,
};

export default Decisions;