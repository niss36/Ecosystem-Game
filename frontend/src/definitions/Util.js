import buildings from "./Buildings";
import {SIZE} from "./Map";

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

export function canBuy(buildingId, state) {
    const costs = buildings[buildingId].costs;

    for (const [resource, cost] of Object.entries(costs)) {
        if (cost > state.resources[resource].amount)
            return false;
    }

    return true;
}

export function getSelection(i, mode) {
    switch (mode) {
        case "fish":
            if ((i % SIZE) < 1) i++;
            if ((i % SIZE) === SIZE - 1) i--;
            if (i < SIZE) i += SIZE;
            if (i > SIZE * (SIZE - 1)) i -= SIZE;

            return [i, i + 1, i - 1, i - SIZE, i - SIZE + 1, i - SIZE - 1, i + SIZE, i + SIZE + 1, i + SIZE - 1];
        case "hunt":
            if ((i % SIZE) < 1) { i++;}
            if ((i % SIZE) === SIZE - 1) {i--;}
            if (i < SIZE) {i += SIZE}
            if (i > SIZE * (SIZE - 1)) {i -= SIZE}

            return [i, i + 1, i + SIZE, i + SIZE + 1];
        default:
            return [];
    }
}