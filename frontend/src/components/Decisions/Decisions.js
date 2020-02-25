import React from "react";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Slider from "@material-ui/core/Slider";

import {nextTurn, startBuyBuilding, startRemoveBuilding, setEffort, setTaxes, setRationing} from "../../actions";

import {
    ANIMAL_FARM,
    FISHING_BOAT,
    HUNTING_SHACK,
    CHEAP_LUMBER_MILL,
    EXPENSIVE_LUMBER_MILL,
    SETTLEMENT
} from "../../definitions/Buildings";
import {FOOD} from "../../definitions/Resources";
import {canBuy} from "../../definitions/Util";

import TabsPane from "../util/TabsPane";
import BuildingPane from "./BuildingPane";

import "./Decisions.css";

import LogPlane from "./LogPlane";

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

function MakeBuildingPane({id, children, ...props}) { // TODO get rid of obsolete args
    return (
        <ConnectedBuildingPane id={id} {...props}>
            {children}
        </ConnectedBuildingPane>
    );
}

const marks = [
    {
        value: 50,
        label: 'SMALL',
    },
    {
        value: 100,
        label: 'MEDIUM',
    },
    {
        value: 150,
        label: 'LARGE',
    },
];
const types = [
    {
        value: 0,
        label: 'Carnivores',
    },
    {
        value: 50,
        label: 'Both',
    },
    {
        value: 100,
        label: 'Herbivores',
    },
];

function EffortBuildingPane({id, ...props}) {
    // let type = null;
    // if (id === HUNTING_SHACK) {
    let type = <Slider step={1} defaultValue={50} marks={types} min={0} max={100} valueLabelDisplay="auto"
                       aria-labelledby={id + "-effort-slider"}
    />

    return (
        <BuildingPane id={id} {...props}>
            <div style={{textAlign: "center"}} id={id + "-effort-slider"}>
                Size
            </div>
            <Slider defaultValue={100} marks={marks} min={50} max={150} step={null} valueLabelDisplay="auto"

                    value={props.effects[FOOD].income} onChange={props.onSetEffort}
                    aria-labelledby={id + "-effort-slider"}/>
            {type && <>Type of animal hunted {type}</>}
        </BuildingPane>
    );
}

const ConnectedEffortBuildingPane = connect(
    mapStateToProps,
    (dispatch, ownProps) => {
        return {
            onBuy: () => dispatch(startBuyBuilding(ownProps.id)),
            onRemove: () => dispatch(startRemoveBuilding(ownProps.id)),
            onSetEffort: (e, v) => dispatch(setEffort(ownProps.id, v))
        }
    }
)(EffortBuildingPane);

function MakeEffortBuildingPane({id}) {
    return (<ConnectedEffortBuildingPane id={id}/>);
}

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
                        <MakeBuildingPane id={ANIMAL_FARM}/>

                        {/*Fisheries*/}
                        <MakeEffortBuildingPane id={FISHING_BOAT}/>

                        {/*Hunting*/}
                        <MakeEffortBuildingPane id={HUNTING_SHACK}/>
                    </div>

                    {/*Forestry*/}
                    <div>
                        <MakeBuildingPane id={CHEAP_LUMBER_MILL}/>
                        <MakeBuildingPane id={EXPENSIVE_LUMBER_MILL}/>
                    </div>

                    {/*Population*/}
                    <div>
                        <MakeBuildingPane id={SETTLEMENT}/>
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
                    <LogPlane/>
                </TabsPane>
                <div className="flex-grow-1"/>
                <NextTurn/>
            </div>
        );
    }
}

/*
<List>
{MakeLog([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8])}
</List>
 */
export default Decisions;