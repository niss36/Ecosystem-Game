import {BUY_BUILDING, NEXT_TURN} from "../actions";

import buildings from "../definitions/Buildings";
import {MONEY, FOOD, WOOD} from "../definitions/Resources";

export function getIncome(resourceId, allBuildingStates) {
    let total = 0;

    const breakdown = {};

    for (const building in allBuildingStates) {
        if (!allBuildingStates.hasOwnProperty(building))
            continue;

        const buildingState = allBuildingStates[building];

        if (buildingState.numberBuilt) {
            const effect = buildingState.effects[resourceId];
            if (effect && effect.income) {
                const buildingIncome = buildingState.numberBuilt * effect.income;

                breakdown[building] = buildingIncome;
                total += buildingIncome;
            }
        }
    }

    return {total, breakdown};
}

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