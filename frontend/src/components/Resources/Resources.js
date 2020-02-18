import React from "react";
import {connect} from "react-redux";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../../definitions/Resources";

import {ResourcePane, HappinessPane, PopulationPane} from "./ResourcePanes";
import {getIncome} from "../util";

import "./Resources.css";

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
        [MONEY]: {
            ...resources[MONEY],
            income: getIncome(MONEY, buildings),
        },
        [FOOD]: {
            ...resources[FOOD],
            income: getIncome(FOOD, buildings),
        },
        [WOOD]: {
            ...resources[WOOD],
            income: getIncome(WOOD, buildings),
        },
        [POPULATION]: resources[POPULATION],
        [HAPPINESS]: resources[HAPPINESS],
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