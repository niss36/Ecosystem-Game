import React from "react";

import {ResourcePane, HappinessPane, PopulationPane} from "./ResourcePanes";

import "./Resources.css";
import {connect} from "react-redux";

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

const ConnectedResourcesContainer = connect(
    state => state.resources,
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