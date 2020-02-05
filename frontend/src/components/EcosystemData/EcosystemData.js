import React from "react";

import Grid from "@material-ui/core/Grid";

import TabsPane from "../util/TabsPane";

import "./EcosystemData.css";

export default class EcosystemData extends React.Component {

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
        return (
            <Grid item xs={12} md={12} className="EcosystemData-root">
                <div className="panel">
                    <TabsPane value={this.state.selectedTab} onChange={this.onTabChange} tabs={["Graphs", "Other stuff"]}>
                        <div>
                            Graphs
                        </div>
                        <div>
                            Other stuff
                        </div>
                    </TabsPane>
                    <p>EcosystemData</p>
                </div>
            </Grid>
        );
    }
}