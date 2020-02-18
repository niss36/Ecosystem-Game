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
            desiredChanges = {fishing: [], hunting: [], farming: []};
        }

        let animalList = [];

        let fishList = [];

        this.state = {
            mapargs : {fishing : false, hunting : false },
            dataCells: dataCells,
            desiredChanges: desiredChanges,
            selectedAnimal: 'none',
            fishList: fishList,
            animalList: animalList,
        };

        this.changeSelectedAnimal = this.changeSelectedAnimal.bind(this);
        this.animalFarm = this.animalFarm.bind(this);
        this.huntingShack = this.huntingShack.bind(this);
        this.fishingBoat = this.fishingBoat.bind(this);
    }

    changeSelectedAnimal(animal){
        this.setState({selectedAnimal :animal});
    }

    animalFarm(selectedIndices, value){
        let farmingChanges = this.state.desiredChanges.hunting;
        for(let i = 0; i < selectedIndices.length; i++){
            farmingChanges.push({index: selectedIndices[i],changeVal: value,animalType: this.state.selectedAnimal});
        }
    }

    huntingShack(selectedIndices, value){
        let huntingChanges = this.state.desiredChanges.farming;
        for(let i = 0; i < selectedIndices.length; i++){
            huntingChanges.push({index: selectedIndices[i], changeVal: value, animalType: this.state.selectedAnimal})
        }
    }

    fishingBoat(selectedIndices, value){
        let fishingChanges = this.state.desiredChanges.fishing;
        for(let i = 0; i < selectedIndices.length; i++){
            fishingChanges.push({index: selectedIndices[i], changeVal: value, fishType: this.state.selectedAnimal})
        }
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
                            <Decisions/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Map/>
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
