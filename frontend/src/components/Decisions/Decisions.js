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

        const tabs = ["Fisheries", "Forestry", "Energy", {label: "Cell info", disabled: true}];

        return (
            <Grid item xs={12} md={4} className="Decisions-root">
                <div className="panel">
                    <TabsPane value={this.state.selectedTab} onChange={this.onTabChange} tabs={tabs}>
                        {
                            tabs.map(tab => <div key={tab}>{tab}</div>)
                        }
                    </TabsPane>
                    <p>Decisions</p>
                </div>
            </Grid>
        );
    }
}