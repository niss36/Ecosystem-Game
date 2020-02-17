import {BUY_BUILDING, SELL_BUILDING, NEXT_TURN} from "../actions";

import buildings from "../definitions/Buildings";
import {MONEY, FOOD, WOOD} from "../definitions/Resources";

import {getIncome} from "../components/util";

function normalResource(id) {
    return function (state = {amount: 1000}, action, allBuildingStates) {
        switch (action.type) {
            case NEXT_TURN:
                const income = getIncome(id, allBuildingStates).total;

                return {...state, amount: state.amount + income};
            case BUY_BUILDING:
                const cost = buildings[action.id].costs[id];
                if (cost) {
                    return {...state, amount: state.amount - cost};
                }

                return state;
            case SELL_BUILDING:
                const sellValue = buildings[action.id].costs[id];
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

const money = normalResource(MONEY);
const food = normalResource(FOOD);
const wood = normalResource(WOOD);

export function resources(state = {}, action, allBuildingStates) {
    return {
        [MONEY]: money(state[MONEY], action, allBuildingStates),
        [FOOD]: food(state[FOOD], action, allBuildingStates),
        [WOOD]: wood(state[WOOD], action, allBuildingStates),
    }
}