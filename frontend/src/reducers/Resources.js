import {combineReducers} from "redux";

import {NEXT_TURN} from "../actions";

function normalResource(id) {
    return function (state = {amount: 1000, income: 0}, action) {
        switch (action.type) {
            case NEXT_TURN:
                return {...state, amount: state.amount + state.income};
            default:
                return state;
        }
    }
}

const money = normalResource("money");
const food = normalResource("food");
const wood = normalResource("wood");

export const resources = combineReducers({
    money,
    food,
    wood,
});