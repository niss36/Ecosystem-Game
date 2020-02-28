import {combineReducers} from "redux";

function dataPoints(state = [], action) {
    return state;
}

function currentTimestamp(state = 0, action) {
    return state;
}

function modValue(state = 1, action) {
    return state;
}

export const graphData = combineReducers( {
    dataPoints,
    currentTimestamp,
    modValue,
});

