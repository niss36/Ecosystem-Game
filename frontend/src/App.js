import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {Decisions, EcosystemData, Map, Resources} from "./components";

import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapargs : {selectionMode : false }
        };

        this.decisionsCall = this.decisionsCall.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
    }

    decisionsCall(name) {
        if (name === "fish") {
            this.setState({mapargs : {selectionMode : true}})
        }

    }

    nextTurn() {
        console.log("Next turn!!"); // TODO
        this.setState({mapargs : {selectionMode : false}});
    }

    render() {

        return (
            <Container maxWidth={false} className="App-root">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Resources/>
                    </Grid>
                    <Grid item xs={8} container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Decisions onNextTurn={this.nextTurn} onDecisionStuff={this.decisionsCall}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Map mapargs = {this.state.mapargs} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <EcosystemData/>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}/>{/*Cell info + maybe events?*/}
                </Grid>
            </Container>
        );
    }
}

export default App;
