import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {Decisions, EcosystemData, Map, Resources, CellInfo} from "./components";

import "./Game.css";

class Game extends React.Component {
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
                    <Grid item xs={2}>{/*Cell info + maybe events?*/}
                        <CellInfo/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Game;
