import React from "react";

import Grid from "@material-ui/core/Grid";

import TabsPane from "../util/TabsPane";

import "./Decisions.css";

export default class Decisions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0
        };

        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(event, value) {
        this.setState({selectedTab: value});
    }

    render() {

        const tabs = ["Agriculture", "Fisheries", "Forestry", "Population", "Hunting", "Energy"];

        return (
            <Grid item xs={12} md={4} className="Decisions-root">
                <div className="panel">
                    <TabsPane variant="scrollable" value={this.state.selectedTab} onChange={this.onTabChange} tabs={tabs}>
                        {/*Agriculture*/}
                        <div>
                            <ul>
                                <li>Build (insert animal) farm</li>
                            </ul>
                        </div>

                        {/*Fisheries*/}
                        <div>
                            <ul>
                                <li>Build/sell fishing boat (each boat goes in a cell in the map) -- produces food</li>
                                <li>Slider for effort</li>
                            </ul>
                        </div>

                        {/*Forestry*/}
                        <div>
                            <ul>
                                <li>
                                    Lumber mill
                                    <ul>
                                        <li>Per cell</li>
                                        <li>
                                            Multiple options
                                            <ul>
                                                <li>
                                                    Cheap: More pollution and doesn't replant
                                                </li>
                                                <li>
                                                    Expensive: Less pollution and more sustainable (Same payoff, less impact on ecosystem)
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/*Population*/}
                        <div>
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

                        {/*Hunting*/}
                        <div>
                            <ul>
                                <li>Kill animals for food</li>
                                <li>Hire hunters per cell</li>
                            </ul>
                        </div>

                        {/*Energy*/}
                        <div>
                            <ul>
                                <li>Electricity: Keep number higher than needs (depend on population)</li>
                                <li>Build coal plant</li>
                                <li>Build wind turbine</li>
                            </ul>
                        </div>
                    </TabsPane>
                    <p>Decisions</p>
                </div>
            </Grid>
        );
    }
}