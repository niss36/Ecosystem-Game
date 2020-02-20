import {combineReducers} from 'redux';

import {CELL_MOUSE_CLICK, END_BUY_BUILDING, SELL_BUILDING, SET_EFFORT, START_BUY_BUILDING} from "../actions";
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

function genericBuilding(state, action) {
    switch (action.type) {
        case START_BUY_BUILDING:
            return state;
        case SELL_BUILDING:
            return {...state, numberBuilt: state.numberBuilt - 1};
        case END_BUY_BUILDING:
            return {...state, numberBuilt: state.numberBuilt +1};
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

function effortBuilding(id, affectedResource) {
    return function (state = {numberBuilt: 0, effects: initialEffects[id]}, action) {
        if (action.id === id) {
            if (action.type === SET_EFFORT) {
                return {...state, effects: {...state.effects, [affectedResource]: {...state.effects[affectedResource], income: action.effort}}};
            } else {
                return genericBuilding(state, action);
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