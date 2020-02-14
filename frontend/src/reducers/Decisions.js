import {combineReducers} from 'redux';

import {BUY_BUILDING, SELL_BUILDING, SET_EFFORT} from "../actions";

const initialEffects = {
    animalFarm: {food: {income: 100}},
    fishingBoat: {food: {income: 50}},
    huntingShack: {food: {income: 100}},
    cheapLumberMill: {wood: {income: 100}},
    expensiveLumberMill: {wood: {income: 100}},
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
    return function (state = {numberBuilt: 0, effects: initialEffects[id]}, action) {
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

function fishingBoat(state = {numberBuilt: 0, effects: initialEffects["fishingBoat"]}, action) {
    if (action.id === "fishingBoat") {
        if (action.type === SET_EFFORT) {
            return {...state, effects: {...state.effects, food: {...state.effects.food, income: action.effort}}};
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