import React from "react";
import {connect} from "react-redux";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD, BIOMASS} from "../../definitions/Resources";

import {getHappiness, getIncome, getMaxPopulation} from "../../definitions/Util";

import {ResourcePane, HappinessPane, PopulationPane, BiomassPane} from "./ResourcePanes";

import "./Resources.css";

function ResourcesContainer({money, food, wood, population, happiness, biomass}) {
    return (
        <>
            <PopulationPane id={POPULATION} {...population}/>
            <HappinessPane id={HAPPINESS} {...happiness}/>
            <ResourcePane id={MONEY} {...money}/>
            <ResourcePane id={FOOD} {...food}/>
            <ResourcePane id={WOOD} {...wood}/>
            <BiomassPane id={BIOMASS} {...biomass}/>
        </>
    )
}

function mapStateToProps(state) {
    const resources = state.resources;

    return {
        [MONEY]: {
            ...resources[MONEY],
            income: getIncome(MONEY, state),
        },
        [FOOD]: {
            ...resources[FOOD],
            income: getIncome(FOOD, state),
        },
        [WOOD]: {
            ...resources[WOOD],
            income: getIncome(WOOD, state),
        },
        [POPULATION]: {
            ...resources[POPULATION],
            max: getMaxPopulation(state),
        },
        [HAPPINESS]: getHappiness(state),
        [BIOMASS] : {...resources[BIOMASS]},
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