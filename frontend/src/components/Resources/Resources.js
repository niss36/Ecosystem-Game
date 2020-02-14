import React from "react";

import {ResourcePane, HappinessPane, PopulationPane} from "./ResourcePanes";

import "./Resources.css";
import {connect} from "react-redux";
import {getIncome} from "../../reducers/Resources";

function ResourcesContainer({money, food, wood, population, happiness}) {
    return (
        <>
            <PopulationPane icon={"/population.svg"} {...population}/>
            <HappinessPane icon={"/smile.svg"} {...happiness}/>
            <ResourcePane icon={"/coin.svg"} name="Money" {...money}/>
            <ResourcePane icon={"/meat.svg"} name="Food" {...food}/>
            <ResourcePane icon={"/logs.svg"} name="Wood" {...wood}/>
        </>
    )
}

function mapStateToProps(state) {
    const resources = state.resources;
    const buildings = state.buildings;

    return {
        money: {
            ...resources.money,
            income: getIncome("money", buildings),
        },
        food: {
            ...resources.food,
            income: getIncome("food", buildings),
        },
        wood: {
            ...resources.wood,
            income: getIncome("wood", buildings),
        },
        population: resources.population,
        happiness: resources.happiness,
    }
}

const ConnectedResourcesContainer = connect(
    mapStateToProps,
    dispatch => ({}),
)(ResourcesContainer);

export default class Resources extends React.Component {

    render() {
        return (
            <div className="Resources-root">
                <h3>Resources</h3>

                <ConnectedResourcesContainer/>
            </div>
        );
    }
}