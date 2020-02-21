import {combineReducers} from 'redux';

import {END_BUY_BUILDING, END_REMOVE_BUILDING, SET_EFFORT, LOG_ITEM_CONFIRM} from "../actions";

import {ANIMAL_FARM, FISHING_BOAT, HUNTING_SHACK, CHEAP_LUMBER_MILL, EXPENSIVE_LUMBER_MILL} from "../definitions/Buildings";
import {FOOD, WOOD} from "../definitions/Resources";

const initialEffects = {
    [ANIMAL_FARM]: {
        [FOOD]: {income: 100}
    },
    [FISHING_BOAT]: {
        [FOOD]: {income: 50}
    },
    [HUNTING_SHACK]: {
        [FOOD]: {income: 100}
    },
    [CHEAP_LUMBER_MILL]: {
        [WOOD]: {income: 100}
    },
    [EXPENSIVE_LUMBER_MILL]: {
        [WOOD]: {income: 100}
    },
};

function genericBuilding(state, action, id) {
    switch (action.type) {
        case END_REMOVE_BUILDING:
            return {...state, numberBuilt: state.numberBuilt - action.selectedCells.length};
        case END_BUY_BUILDING:
            return {...state, numberBuilt: state.numberBuilt +action.selectedCells.length};// TODO CHANGE TO BE NUMBER MADE
        default:
            return state;
    }
}

function normalBuilding(id) {
    return function (state = {numberBuilt: 0, effects: initialEffects[id]}, action) {
        if (action.id === id || action.type === LOG_ITEM_CONFIRM) {
            return genericBuilding(state, action, id);
        }

        return state;
    }
}

function effortBuilding(id, affectedResource) {
    return function (state = {numberBuilt: 0, effects: initialEffects[id]}, action) {
        if (action.id === id || action.type === LOG_ITEM_CONFIRM) {
            if (action.type === SET_EFFORT) {
                return {...state, effects: {...state.effects, [affectedResource]: {...state.effects[affectedResource], income: action.effort}}};
            } else {
                return genericBuilding(state, action, id);
            }
        }

        return state;
    }
}

const animalFarm = normalBuilding(ANIMAL_FARM);
const fishingBoat = effortBuilding(FISHING_BOAT, FOOD);
const huntingShack = effortBuilding(HUNTING_SHACK, FOOD);
const cheapLumberMill = normalBuilding(CHEAP_LUMBER_MILL);
const expensiveLumberMill = normalBuilding(EXPENSIVE_LUMBER_MILL);

export const buildings = combineReducers({
    animalFarm,
    fishingBoat,
    huntingShack,
    cheapLumberMill,
    expensiveLumberMill,
});