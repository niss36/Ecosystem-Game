import React from "react";
import {connect, Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import appReducer from "./reducers";
import {MENU, RUNNING, LOST} from "./definitions/GameStatus";
import Game from "./Game";
import Menu from "./Menu";
import "./App.css"
import {loading, getData} from "./actions";
import {Backdrop, Modal} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Button from "@material-ui/core/Button";

const store = createStore(appReducer, applyMiddleware(thunk));

function makeLoading({...props}){
    return(
        <Modal open={props.canOpen}>
            <Backdrop open={props.canOpen}>
                <CircularProgress color='inherit' size={100}/>
            </Backdrop>
        </Modal>
    )
}

const mapStateToLogProps = (state) => {
    return {
        ...state,
        canOpen: state.Data.updateData.loading,
        initial: state.Data.updateData.initial,
    };
};

const mapDispatchToLogProps = (dispatch) => {
    return {
       onPressButton: (initial) => {dispatch(getData(initial));},
    }
};

const ConnectedLoading = connect(
    mapStateToLogProps,
    mapDispatchToLogProps,
)(makeLoading);

const ConnectedBody = connect(
    state => ({status: state.gameStatus}),
    dispatch => ({start: () => dispatch(loading(true))}),
)(Body);

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
