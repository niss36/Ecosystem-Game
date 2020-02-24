import React from "react";

import Game from "./Game";
import Menu from "./Menu";

import "./App.css";
import {createStore, applyMiddleware} from "redux";
import appReducer from "./reducers";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

const store = createStore(appReducer, applyMiddleware(thunk));

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            started: false,
        }; // TODO use redux instead of state here
    }

    render() {
        return (
            <Provider store={store}>
                {
                    this.state.started ? (
                        <Game/>
                    ) : (
                        <Menu onStart={() => this.setState({started: true})}/>
                    )
                }
            </Provider>
        );
    }
}

export default App;
