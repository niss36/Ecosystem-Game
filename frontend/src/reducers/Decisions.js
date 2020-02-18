import {combineReducers} from 'redux';

import {BUY_BUILDING, SELL_BUILDING, SET_EFFORT} from "../actions";
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

const animalFarm = normalBuilding(ANIMAL_FARM);
const huntingShack = normalBuilding(HUNTING_SHACK);
const cheapLumberMill = normalBuilding(CHEAP_LUMBER_MILL);
const expensiveLumberMill = normalBuilding(EXPENSIVE_LUMBER_MILL);

function fishingBoat(state = {numberBuilt: 0, effects: initialEffects[FISHING_BOAT]}, action) {
    if (action.id === FISHING_BOAT) {
        if (action.type === SET_EFFORT) {
            return {...state, effects: {...state.effects, [FOOD]: {...state.effects[FOOD], income: action.effort}}};
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