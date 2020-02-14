import React from "react";

import {ResourcePane, HappinessPane, PopulationPane} from "./ResourcePanes";

import "./Resources.css";
import {connect} from "react-redux";
import {getIncome} from "../../reducers/Resources";
import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../../definitions/Resources";

function ResourcesContainer({money, food, wood, population, happiness}) {
    return (
        <>
            <PopulationPane id={POPULATION} {...population}/>
            <HappinessPane id={HAPPINESS} {...happiness}/>
            <ResourcePane id={MONEY} {...money}/>
            <ResourcePane id={FOOD} {...food}/>
            <ResourcePane id={WOOD} {...wood}/>
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