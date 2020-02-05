import React from "react";

import Grid from "@material-ui/core/Grid";

import "./Map.css";

export default class Map extends React.Component {

    render() {
        return (
            <Grid item xs={12} md={8} className="Map-root">
                <div className="panel">
                    <p>Map</p>
                </div>
            </Grid>
        );
    }
}