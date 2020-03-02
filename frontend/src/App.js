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
import {Button} from "@material-ui/core";
import {EcosystemData} from "./components";

const store = createStore(appReducer, applyMiddleware(thunk));

function makeLoading({...props}){
    return(
        <Modal open={props.loading}>
            <Backdrop open={props.loading} timeout={''}>
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
            return (<div>
                    <div align={'Center'}>
                        <h1 align={'Center'}>You lose</h1>
                        <p>
                            <img src={'/icons/sad.svg'} alt={''} height={100} align={'Center'}/>
                        </p>
                        <Button className="Menu-button" variant="contained" color="primary" onClick={start}>
                            Restart
                        </Button>
                    </div>
                        <EcosystemData/>
                    </div>);
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
