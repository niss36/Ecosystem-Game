import React from "react";

import Game from "./Game";
import Menu from "./Menu";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            started: false,
        };
    }

    render() {
        return this.state.started ? (
            <Game/>
        ) : (
            <Menu onStart={() => this.setState({started: true})}/>
        );
    }
}

export default App;
