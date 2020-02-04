import React from "react";

import Decisions from "./components/Decisions/Decisions";
import EcosystemData from "./components/EcosystemData/EcosystemData";
import Map from "./components/Map/Map";

import "./App.css";
import {Container} from "@material-ui/core";

function App() {
    return (
        <Container>
            <div className="App-root">
                <Decisions/>
                <Map/>
                <EcosystemData/>
            </div>
        </Container>
    );
}

export default App;
