import {BUY_BUILDING, NEXT_TURN} from "../actions";

import {buildings} from "../components/Decisions/Buildings";

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

const money = normalResource("money");
const food = normalResource("food");
const wood = normalResource("wood");

export function resources(state = {}, action, allBuildingStates) {
    return {
        money: money(state.money, action, allBuildingStates),
        food: food(state.food, action, allBuildingStates),
        wood: wood(state.wood, action, allBuildingStates),
    }
}