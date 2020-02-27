import React from "react";
import {connect, Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import {startGame} from "./actions";
import appReducer from "./reducers";

import {MENU, RUNNING, LOST} from "./definitions/GameStatus";

import Game from "./Game";
import Menu from "./Menu";

import "./App.css";

const store = createStore(appReducer, applyMiddleware(thunk));

function Body({status, start}) {
    switch (status) {
        case MENU:
            return (<Menu onStart={start}/>);
        case RUNNING:
            return (<Game/>);
        case LOST:
            return (<div>You lose</div>); // TODO
        default:
    }
}

const ConnectedBody = connect(
    state => ({status: state.gameStatus}),
    dispatch => ({start: () => dispatch(startGame())}),
)(Body);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedBody/>
            </Provider>
        );
    }
}

export default App;
