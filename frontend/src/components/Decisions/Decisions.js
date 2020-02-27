import React from "react";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Slider from "@material-ui/core/Slider";

import {nextTurn, startBuyBuilding, startRemoveBuilding, changeSliders, setTaxes, setRationing} from "../../actions";

import {
    ANIMAL_FARM,
    FISHING_BOAT,
    HUNTING_SHACK,
    CHEAP_LUMBER_MILL,
    EXPENSIVE_LUMBER_MILL,
    SETTLEMENT,
    PLANTING_TREES
} from "../../definitions/Buildings";
import {FOOD} from "../../definitions/Resources";
import {canBuy} from "../../definitions/Util";

import TabsPane from "../util/TabsPane";
import BuildingPane from "./BuildingPane";

import "./Decisions.css";

import LogPane from "./LogPane";

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.buildings[ownProps.id],
        canBuy: canBuy(ownProps.id, state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBuy: () => dispatch(startBuyBuilding(ownProps.id)),
        onRemove: () => dispatch(startRemoveBuilding(ownProps.id)),
    }
};

const ConnectedBuildingPane = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingPane);

const marks = [
    {
        value: 10,
        label: 'SMALL',
    },
    {
        value: 500,
        label: 'MEDIUM',
    },
    {
        value: 1000,
        label: 'LARGE',
    },
];
const types = [
    {
        value: 0,
        label: 'Low',
    },
    {
        value: 50,
        label: 'Mid',
    },
    {
        value: 100,
        label: 'High',
    },
];

function EffortBuildingPane({id, ...props}) {


    return (
        <BuildingPane id={id} {...props}>
            <div style={{textAlign: "center"}} id={id + "-effort-slider"}>
                Max size of hunted animal in kg
            </div>
            <Slider marks={marks} min={0} max={1000} step={1} valueLabelDisplay="auto"

                    value={props.size} onChange={((event, value) => {
                        props.onChangeSliders(event, "size",value < 10 ? 10 : value);
            })}
                    aria-labelledby={id + "-effort-slider"}/>
                    Effort
            <Slider step={1} marks={types} min={0} max={100} valueLabelDisplay="auto"
                    aria-labelledby={id + "-effort-slider"}
                    value={props.effort}
                    onChange={((event, value) => {
                        props.onChangeSliders(event, "effort",value < 10 ? 10 : value);})}
            />
        </BuildingPane>
    );
}

const ConnectedEffortBuildingPane = connect(
    mapStateToProps,
    (dispatch, ownProps) => {
        return {
            onBuy: () => dispatch(startBuyBuilding(ownProps.id)),
            onRemove: () => dispatch(startRemoveBuilding(ownProps.id)),
            onChangeSliders: (e, slider, v) => dispatch(changeSliders(ownProps.id,slider, v))
        }
    }
)(EffortBuildingPane);

function TaxesPane(props) {
    return (
        <div>
            <div style={{textAlign: "center"}} id="taxes-effort-slider">
                Taxes
            </div>
            <div>
                <Slider value={props.taxes} onChange={props.setTaxes} aria-labelledby="taxes-effort-slider"/>
            </div>
        </div>
    );
}

const ConnectedTaxesPane = connect(
    state => ({taxes: state.resources.taxes}),
    dispatch => ({setTaxes: (e, v) => dispatch(setTaxes(v))})
)(TaxesPane);

function RationingPane(props) {
    return (
        <div>
            <div style={{textAlign: "center"}} id="rationing-effort-slider">
                Rationing
            </div>
            <div>
                <Slider value={props.rationing} onChange={props.setRationing}
                        aria-labelledby="rationing-effort-slider"/>
            </div>
        </div>
    );
}

const ConnectedRationingPane = connect(
    state => ({rationing: state.resources.rationing}),
    dispatch => ({setRationing: (e, v) => dispatch(setRationing(v))})
)(RationingPane);

const NextTurn = connect()(({dispatch}) => (
    <Button
        className="Decisions-nextTurn"
        onClick={() => dispatch(nextTurn())}
        size="large"
        fullWidth
        startIcon={<PlayArrow/>}
    >
        Next turn
    </Button>
));

class Decisions extends React.Component {

    render() {
        const tabs = ["Food", "Forestry", "Population", "Log"];

        return (
            <div className="Decisions-root panel">
                <TabsPane variant="scrollable" tabs={tabs}>
                    {/*Food*/}
                    <div>
                        {/*Agriculture*/}
                        <ConnectedBuildingPane id={ANIMAL_FARM}/>

                        {/*Fisheries*/}
                        <ConnectedEffortBuildingPane id={FISHING_BOAT}/>

                        {/*Hunting*/}
                        <ConnectedEffortBuildingPane id={HUNTING_SHACK}/>
                    </div>

                    {/*Forestry*/}
                    <div>
                        <ConnectedBuildingPane id={CHEAP_LUMBER_MILL}/>
                        <ConnectedBuildingPane id={EXPENSIVE_LUMBER_MILL}/>
                        <ConnectedBuildingPane id={PLANTING_TREES}/>
                    </div>

                    {/*Population*/}
                    <div>
                        <ConnectedBuildingPane id={SETTLEMENT}/>
                        <ul className={"sliderPanel"}>
                            <ConnectedTaxesPane/>
                            <li>
                                Taxes
                                <ul>
                                    <li>Main source of money</li>
                                    <li>Slider: balance amount of tax and happiness</li>
                                </ul>
                            </li>
                        </ul>
                        <ul className={"sliderPanel"}>
                            <ConnectedRationingPane/>
                            <li>
                                Rationing
                                <ul>
                                    <li>Balance food consumption for happiness</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/*Log*/}
                    <LogPane/>
                </TabsPane>
                <div className="flex-grow-1"/>
                <NextTurn/>
            </div>
        );
    }
}

export default Decisions;