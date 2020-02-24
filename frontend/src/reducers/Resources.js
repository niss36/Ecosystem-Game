import {combineReducers} from "redux";

import {END_BUY_BUILDING, END_REMOVE_BUILDING, NEXT_TURN, LOG_ITEM_CONFIRM, SET_TAXES} from "../actions";

import buildings from "../definitions/Buildings";
import {POPULATION, MONEY, FOOD, WOOD, HAPPINESS} from "../definitions/Resources";

function normalResource(id) {
    return function (state = {amount: 1000}, action) {
        switch (action.type) {
            case END_BUY_BUILDING:
                const cost = buildings[action.id].costs[id] * action.selectedCells.length;
                if (cost) {
                    return {...state, amount: state.amount - cost};
                }

                return state;
            case END_REMOVE_BUILDING:
                const sellValue = buildings[action.id].costs[id] * action.selectedCells.length;
                // TODO decide what portion of the original value to refund
                if (sellValue) {
                    return {...state, amount: state.amount + sellValue};
                }

                return state;
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
});
