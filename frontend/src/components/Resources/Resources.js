import React from "react";

import {ResourcePane, HappinessPane, PopulationPane} from "./ResourcePanes";

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

                <PopulationPane icon={"/population.svg"} population={42} food={1337}/>
                <HappinessPane icon={"/smile.svg"} happiness={70}/>
                <ResourcePane icon={"/coin.svg"} name="Money" amount={100000} income={1000}/>
                <ResourcePane icon={"/meat.svg"} name="Food" amount={100000} income={1000} />
                <ResourcePane icon={"/logs.svg"} name="Wood" amount={100000} income={1000}/>

                {/*<ul>
                    <li>Money: {this.money}</li>
                    <li>Food: {this.food}</li>
                    <li>Population: {this.population}</li>
                    <li>Happiness: {this.happiness}</li>
                    <li>Electricity: {this.electricity}</li>
                    <li>Wood: {this.wood}</li>
                </ul>*/}
            </div>
        );
    }
}