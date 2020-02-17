import {BUY_BUILDING, SELL_BUILDING, NEXT_TURN} from "../actions";

import buildings from "../definitions/Buildings";
import {POPULATION, MONEY, FOOD, WOOD} from "../definitions/Resources";

import {getIncome} from "../components/util";

function normalResource(id) {
    return function (state = {amount: 1000}, action, allBuildingStates) {
        switch (action.type) {
            case NEXT_TURN:
                const income = getIncome(id, allBuildingStates).total;
                // TODO maybe compute this at the top level in order not to require the building state.

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

export function resources(state = {}, action, allBuildingStates) {
    return {
        [POPULATION]: population(state[POPULATION], action),
        [MONEY]: money(state[MONEY], action, allBuildingStates),
        [FOOD]: food(state[FOOD], action, allBuildingStates),
        [WOOD]: wood(state[WOOD], action, allBuildingStates),
    }
}