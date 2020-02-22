import React from "react";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Slider from "@material-ui/core/Slider";

import {nextTurn, startBuyBuilding, startRemoveBuilding, setEffort, setTaxes} from "../../actions";

import {ANIMAL_FARM, FISHING_BOAT, HUNTING_SHACK, CHEAP_LUMBER_MILL, EXPENSIVE_LUMBER_MILL} from "../../definitions/Buildings";
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

function EffortBuildingPane({id, ...props}) {
    return (
        <BuildingPane id={id} {...props}>
            <div style={{textAlign: "center"}} id={id + "-effort-slider"}>
                Effort- Change this to size!
            </div>
            <Slider value={props.effects[FOOD].income} onChange={props.onSetEffort} aria-labelledby={id + "-effort-slider"}/>
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
            <Slider value={props.taxes} onChange={props.setTaxes} aria-labelledby="taxes-effort-slider"/>
        </div>
    );
}

const ConnectedTaxesPane = connect(
    state => ({taxes: state.resources.taxes}),
    dispatch => ({setTaxes: (e, v) => dispatch(setTaxes(v))})
)(TaxesPane);

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

    objectPlaceholder = {
        icon: 'unknown.svg',
        income: 0,
        cost: 100,
        killRate: 10,
        cellNo: 0
    };

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
                        <ConnectedTaxesPane/>
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