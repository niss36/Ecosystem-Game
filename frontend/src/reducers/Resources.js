import {combineReducers} from "redux";

import {END_BUY_BUILDING, END_REMOVE_BUILDING, SET_TAXES, SET_RATIONING} from "../actions";

import buildings from "../definitions/Buildings";
import {POPULATION, MONEY, FOOD, WOOD, HAPPINESS} from "../definitions/Resources";

const initialAmounts = {
    [MONEY]: 10000,
    [FOOD]: 2000,
    [WOOD]: 3000,
};

function normalResource(id) {
    return function (state = {amount: initialAmounts[id]}, action) {
        switch (action.type) {
            case END_BUY_BUILDING: {
                const cost = buildings[action.id].costs[id];
                if (cost) {
                    const buyValue = cost * action.selectedCells.length;
                    return {...state, amount: state.amount - buyValue};
                }

                return state;
            }
            case END_REMOVE_BUILDING: {
                if (!action.noRefund) {
                    const cost = buildings[action.id].costs[id];
                    if (cost) {
                        const sellValue = Math.floor(cost * action.builtThisTurn + cost * (action.selectedCells.length - action.builtThisTurn) * 0.80);
                        return {...state, amount: state.amount + sellValue};
                    }
                }

                return state;
            }
            default:
                return state;
        }
    }
}

function population(state = {amount: 10}, action) {
    return state;
}

function happiness(state = {amount: 100}, action) {
    return state;
}

function taxes(state = 30, action) {
    if (action.type === SET_TAXES) {
        return action.taxes;
    }

    return state;
}

function rationing(state = 50, action) {
    if (action.type === SET_RATIONING) {
        return action.rationing;
    }

    return state;
}

const money = normalResource(MONEY);
const food = normalResource(FOOD);
const wood = normalResource(WOOD);

export const resources = combineReducers({
    [POPULATION]: population,
    [MONEY]: money,
    [FOOD]: food,
    [WOOD]: wood,
    [HAPPINESS]: happiness,
    taxes,
    rationing,
});
