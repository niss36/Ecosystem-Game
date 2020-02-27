import React from "react";

import Game from "./Game";
import Menu from "./Menu";

import "./App.css";
import {createStore, applyMiddleware} from "redux";
import appReducer from "./reducers";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {initialise} from "./actions";

const store = createStore(appReducer, applyMiddleware(thunk));

function onStart() {
    this.setState({started: true});
    store.dispatch(initialise());
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            started: true,
        }; // TODO use redux instead of state here
    }

    render() {
        return (
            <Provider store={store}>
                {
                    this.state.started ? (
                        <Game/>
                    ) : (
                        <Menu onStart={() => {store.dispatch(initialise()); this.setState({started: true})}}/>
                    )
                }
            </Provider>
        );
    }
}

export default App;
