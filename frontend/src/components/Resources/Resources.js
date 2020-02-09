import React from "react";

import {ResourcePane, HappinessPane} from "./ResourcePanes";

import "./Resources.css";

export default class Resources extends React.Component {
    money = 0;
    food = 0;
    population = 0;
    happiness = 0;
    electricity = 0;
    wood = 0;

    render() {
        return (
            <div className="Resources-root">
                <h3>Resources</h3>

                <HappinessPane happiness={70}/>
                <ResourcePane name="Money" amount={100000} income={1000}/>
                <ResourcePane name="Food" amount={100000} income={1000}/>
                <ResourcePane name="Wood" amount={100000} income={1000}/>

                <ul>
                    <li>Money: {this.money}</li>
                    <li>Food: {this.food}</li>
                    <li>Population: {this.population}</li>
                    <li>Happiness: {this.happiness}</li>
                    <li>Electricity: {this.electricity}</li>
                    <li>Wood: {this.wood}</li>
                </ul>
            </div>
        );
    }
}