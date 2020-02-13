import {combineReducers} from 'redux';

import {BUY_BUILDING, SELL_BUILDING, SET_EFFORT} from "../actions";

const initialState = {
    numberBuilt: 0,
};

function genericBuilding(state, action) {
    switch (action.type) {
        case BUY_BUILDING:
            return {...state, numberBuilt: state.numberBuilt + 1};
        case SELL_BUILDING:
            return {...state, numberBuilt: state.numberBuilt - 1};
        default:
            return state;
    }
}

function normalBuilding(id) {
    return function (state = initialState, action) {
        if (action.id === id) {
            return genericBuilding(state, action);
        }

        return state;
    }
}

const animalFarm = normalBuilding("animalFarm");
const huntingShack = normalBuilding("huntingShack");
const cheapLumberMill = normalBuilding("cheapLumberMill");
const expensiveLumberMill = normalBuilding("expensiveLumberMill");

const fishInitialState = {
    ...initialState,
    effort: 50,
};

function fishingBoat(state = fishInitialState, action) {
    if (action.id === "fishingBoat") {
        if (action.type === SET_EFFORT) {
            return {...state, effort: action.effort};
        } else {
            return genericBuilding(state, action);
        }
    }

    return state;
}

export const buildings = combineReducers({
    animalFarm,
    fishingBoat,
    huntingShack,
    cheapLumberMill,
    expensiveLumberMill,
});