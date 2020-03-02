import {combineReducers} from 'redux';

import {END_BUY_BUILDING, END_REMOVE_BUILDING, CHANGE_SLIDERS} from "../actions";

import {
    FISHING_BOAT,
    HUNTING_SHACK,
    CHEAP_LUMBER_MILL,
    EXPENSIVE_LUMBER_MILL,
    SETTLEMENT,
    PLANTING_TREES
} from "../definitions/Buildings";
import {POPULATION, FOOD, WOOD} from "../definitions/Resources";

const initialEffects = {
    [FISHING_BOAT]: {
    },
    [HUNTING_SHACK]: {
    },
    [CHEAP_LUMBER_MILL]: {
        [WOOD]: {income: 100}
    },
    [EXPENSIVE_LUMBER_MILL]: {
        [WOOD]: {income: 150}
    },
    [PLANTING_TREES]:{
        [WOOD]: {income:10}
    },
    [SETTLEMENT]: {
        [POPULATION]: {max: 10}
    }
};

function genericBuilding(state, action) {
    switch (action.type) {
        case END_REMOVE_BUILDING:
            return {...state, numberBuilt: state.numberBuilt - action.selectedCells.length};
        case END_BUY_BUILDING:
            return {...state, numberBuilt: state.numberBuilt + action.selectedCells.length};// TODO CHANGE TO BE NUMBER MADE
        default:
            return state;
    }
}

function normalBuilding(id) {
    return function (state = {numberBuilt: 0, effects: initialEffects[id]}, action) {
        if (action.id === id) {
            return genericBuilding(state, action, id);
        }

        return state;
    }
}

function effortBuilding(id) {
    return function (state = {numberBuilt: 0, effort: 50, size: 500, effects: initialEffects[id]}, action) {
        if (action.id === id) {
            if (action.type === CHANGE_SLIDERS) {
                if (action.slider === "effort") {
                    return {...state, effort: action.newValue}
                } else if (action.slider === "size") {
                    return {...state, size: action.newValue}
                } else {
                    return state;
                }
            } else {
                return genericBuilding(state, action, id);
            }
        }

        return state;
    }
}

const fishingBoat = effortBuilding(FISHING_BOAT, FOOD);
const huntingShack = effortBuilding(HUNTING_SHACK, FOOD);
const cheapLumberMill = normalBuilding(CHEAP_LUMBER_MILL);
const expensiveLumberMill = normalBuilding(EXPENSIVE_LUMBER_MILL);
const settlement = normalBuilding(SETTLEMENT);
const planting =normalBuilding(PLANTING_TREES);


export const buildings = combineReducers({
    fishingBoat,
    huntingShack,
    cheapLumberMill,
    expensiveLumberMill,
    planting,
    settlement,
});