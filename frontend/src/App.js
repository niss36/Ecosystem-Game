import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Decisions from "./components/Decisions/Decisions";
import EcosystemData from "./components/EcosystemData/EcosystemData";
import Map from "./components/Map/Map";

import "./App.css";

function App() {
    return (
        <Container className="App-root">
            <Grid container spacing={2}>
                <Decisions/>
                <Map/>
                <EcosystemData/>
            </Grid>
        </Container>
    );
}

export default App;
