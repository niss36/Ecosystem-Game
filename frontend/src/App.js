import React from "react";
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import appReducer from "./reducers";
import {LOST, MENU, RUNNING} from "./definitions/GameStatus";
import Game from "./Game";
import Menu from "./Menu";
import "./App.css"
import {loading} from "./actions";
import {Backdrop, CircularProgress, Modal} from '@material-ui/core';

const store = createStore(appReducer, applyMiddleware(thunk));

function makeLoading({...props}){
    return(
        <Modal open={props.loading}>
            <Backdrop open={props.loading}>
                <CircularProgress color='inherit' size={100}/>
            </Backdrop>
        </Modal>
    )
}

const ConnectedLoading = connect(
    state => ({loading: state.loading}),
    dispatch => ({}),
)(makeLoading);

function Body({status, start}) {
    switch (status) {
        case MENU:
            return (<Menu onStart={start}/>);
        case RUNNING:
            return (<Game/>);
        case LOST:
            return (<Box className={"lost"}>You lose
                    <div className={"img"}/>
                    </Box>);
        default:
    }
}

const ConnectedBody = connect(
    state => ({status: state.gameStatus}),
    dispatch => ({start: () => dispatch(loading(true))}),
)(Body);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedBody/>
                <ConnectedLoading/>
            </Provider>
        );
    }
}

export default App;
