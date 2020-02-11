import React from "react";

import TabsPane from "../util/TabsPane";

import "./EcosystemData.css";

export default class EcosystemData extends React.Component {

    render() {
        return (
            <div className="panel">
                <TabsPane tabs={["Graphs", "Other stuff"]}>
                    <div>
                        Graphs
                    </div>
                    <div>
                        Other stuff
                    </div>
                </TabsPane>
                <p>EcosystemData</p>
            </div>
        );
    }
}