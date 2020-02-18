import React from "react";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import MuiSlider from "@material-ui/core/Slider";

import TabsPane from "../util/TabsPane";
import BuildingPane from "./BuildingPane";
import {ANIMAL_FARM, FISHING_BOAT, HUNTING_SHACK, CHEAP_LUMBER_MILL, EXPENSIVE_LUMBER_MILL} from "../../definitions/Buildings";
import {FOOD} from "../../definitions/Resources";
import {buyBuilding, sellBuilding, setEffort, nextTurn} from "../../actions";
import {canBuy} from "../../definitions/Util";

import "./Decisions.css";

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.buildings[ownProps.id],
        canBuy: canBuy(ownProps.id, state),
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
        <ConnectedBuildingPane id={id} {...props}>
            {children}
        </ConnectedBuildingPane>
    );
}

function MakeFishingBoatPane() {

    const id = FISHING_BOAT;

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
            <BuildingPane {...props}>
                <div style={{textAlign: "center"}} id="fish-effort-slider">
                    Effort
                </div>
                <MuiSlider value={props.effects[FOOD].income} onChange={props.onSetEffort} aria-labelledby="fish-effort-slider"/>
            </BuildingPane>
        )
    });

    return <ABuildingPane id={id}/>
}

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
        const tabs = ["Food", "Forestry", "Population"];

        return (
            <div className="Decisions-root panel">
                <TabsPane variant="scrollable" tabs={tabs}>
                    {/*Food*/}
                    <div>
                        {/*Agriculture*/}
                        <MakeBuildingPane id={ANIMAL_FARM}/>

                        {/*Fisheries*/}
                        <MakeFishingBoatPane/>

                        {/*Hunting*/}
                        <MakeBuildingPane id={HUNTING_SHACK}/>
                    </div>

                    {/*Forestry*/}
                    <div>
                        <MakeBuildingPane id={CHEAP_LUMBER_MILL}/>
                        <MakeBuildingPane id={EXPENSIVE_LUMBER_MILL}/>
                    </div>

                    {/*Population*/}
                    <div>
                        <div>
                            <div style={{textAlign: "center"}}>
                                Tax
                            </div>
                            <MuiSlider value={100}/> {/*TODO state*/}
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
                <div className="flex-grow-1"/>
                <NextTurn/>
            </div>
        );
    }
}

export default Decisions;