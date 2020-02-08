import React from "react";

import "./Resources.css";

export default class Resources extends React.Component {

    render() {
        return (
            <div className="Resources-root">
                <h3>Resources</h3>

                <ul>
                    <li>Money</li>
                    <li>Food</li>
                    <li>Population</li>
                    <li>Happiness</li>
                    <li>Electricity</li>
                    <li>Wood</li>
                </ul>
            </div>
        );
    }
}
