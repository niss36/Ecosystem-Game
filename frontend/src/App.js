import React from "react";

import Decisions from "./components/Decisions/Decisions";
import EcosystemData from "./components/EcosystemData/EcosystemData";
import Map from "./components/Map/Map";

import "./App.css";

function App() {
    return (
        <div>
            <Decisions/>
            <Map/>
            <EcosystemData/>
        </div>
    );
}

export default App;
