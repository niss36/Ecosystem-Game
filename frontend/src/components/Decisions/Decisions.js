import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import PlayArrow from "@material-ui/icons/PlayArrow";
import MuiSlider from "@material-ui/core/Slider";

import TabsPane from "../util/TabsPane";
import BuildingPane from "./BuildingPane";
import {buildings} from "./Buildings";

import "./Decisions.css";

function MakeBuildingPane({id, children, ...props}) {
    return (
        <BuildingPane building={buildings[id]} {...props} numberBuilt={0} canBuy> {/*TODO*/}
            {children}
        </BuildingPane>
    )
}

class Decisions extends React.Component {

    objectPlaceholder = {
        icon: 'unknown.svg',
        income: 0,
        cost: 100,
        killRate: 10,
        cellNo: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            fishBoatEffort: 50,
            HuntingEffort:100,
            selectedAnimal: 'none',
            fishList: this.props.fishList,
            animalList: this.props.animalList,
        };

        this.onFishBoatEffortChange = this.onFishBoatEffortChange.bind(this);
        this.onHuntEffortChange=this.onHuntEffortChange.bind(this);
    }

    onFishBoatEffortChange(e, v) {
        this.setState({fishBoatEffort: v});
    }
    onHuntEffortChange(e, v) {
        this.setState({HuntingEffort: v});
    }

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
                        <MakeBuildingPane id="fishingBoat" onBuy={() => onDecisionStuff("fish")} extraEffects={[{resource: "food", income: this.state.fishBoatEffort,icon:"/meat.svg"}]}>
                            <div style={{textAlign: "center"}} id="fish-effort-slider">
                                Effort
                            </div>
                            <MuiSlider value={this.state.fishBoatEffort} onChange={this.onFishBoatEffortChange} aria-labelledby="fish-effort-slider"/>
                        </MakeBuildingPane>
                        {/*Hunting*/}
                        <MakeBuildingPane id="huntingShack" onBuy={() => onDecisionStuff("animal")} extraEffects={[{resource: "food", income: this.state.HuntingEffort,icon:"/meat.svg"}]}>
                            <div style={{textAlign: "center"}} id="hunt-effort-slider">
                                Effort
                            </div>
                            <MuiSlider value={this.state.HuntingEffort} onChange={this.onHuntEffortChange} aria-labelledby="hunt-effort-slider"/>
                        </MakeBuildingPane>
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
                <div className="flex-grow-1"/>
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