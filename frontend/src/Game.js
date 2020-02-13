import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {Decisions, EcosystemData, Map, Resources} from "./components";

import "./Game.css";

class Game extends React.Component {
    constructor(props) {
        super(props);

        let dataCells = new Array(16 * 16);

        let desiredChanges = new Array(16 * 16);

        for(let i = 0; i < dataCells.length; i++){
            dataCells[i] = {};
            desiredChanges[i] = {fishing: [], hunting: []};
        }

        this.state = {
            mapargs : {selectionMode : false },
            dataCells: dataCells,
            desiredChanges: desiredChanges,
        };

        this.decisionsCall = this.decisionsCall.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }

    submitChange(i, key, value){
        let selectedCell = this.state.desiredChanges[i];
        if(key === "fishing"){
            selectedCell.fishing.push(value);
        }
        else if(key === "hunting"){
            selectedCell.hunting.push(value);
        }
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
            <Container maxWidth={false} className="Game-root">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Resources/>
                    </Grid>
                    <Grid item xs={8} container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Decisions onNextTurn={this.nextTurn} onDecisionStuff={this.decisionsCall}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Map mapargs = {this.state.mapargs} submitChange={this.submitChange}/>
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

export default Game;
