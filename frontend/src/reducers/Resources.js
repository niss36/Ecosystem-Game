import {combineReducers} from "redux";

import {END_BUY_BUILDING, END_REMOVE_BUILDING, NEXT_TURN, LOG_ITEM_CONFIRM} from "../actions";

import buildings from "../definitions/Buildings";
import {POPULATION, MONEY, FOOD, WOOD} from "../definitions/Resources";

function normalResource(id) {
    return function (state = {amount: 1000}, action) {
        switch (action.type) {
            case END_BUY_BUILDING:
                const cost = buildings[action.id].costs[id];
                if (cost) {
                    return {...state, amount: state.amount - cost}; /*TODO should we multiply cost by number actually built?*/
                }

                return state;
            case END_REMOVE_BUILDING:
                const sellValue = buildings[action.id].costs[id];
                // TODO decide what portion of the original value to refund
                if (sellValue) {
                    return {...state, amount: state.amount + sellValue}; /*TODO same as cost; multiply by number removed?*/
                }

                return state;
            default:
                return state;
        }
    }
}

function population(state = {amount: 10, max: 25}, action) {
    switch (action.type) {
        case NEXT_TURN:
            // TODO determine how population should grow
            return {...state, amount: state.amount + 1};
        default:
            return state;
    }
}

const money = normalResource(MONEY);
const food = normalResource(FOOD);
const wood = normalResource(WOOD);

export const resources = combineReducers({
    [POPULATION]: population,
    [MONEY]: money,
    [FOOD]: food,
    [WOOD]: wood,
});
