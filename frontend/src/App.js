import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Decisions from "./components/Decisions/Decisions";
import EcosystemData from "./components/EcosystemData/EcosystemData";
import Map from "./components/Map/Map";
import Resources from "./components/Resources/Resources";

import "./App.css";

function App() {
    return (
        <Container maxWidth={false} className="App-root">
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

export default App;
