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
    const [row, col] = [Math.floor(i / SIZE), i % SIZE];

    switch (mode) {
        case "fish":
            if (col === 0) i++;
            if (col === SIZE - 1) i--;
            if (row === 0) i += SIZE;
            if (row === SIZE - 1) i -= SIZE;

            return [
                i - SIZE - 1, i - SIZE, i - SIZE + 1,
                i - 1,        i,        i + 1,
                i + SIZE - 1, i + SIZE, i + SIZE + 1
            ];
        case "hunt":
            if (col === SIZE - 1) i--;
            if (row === SIZE - 1) i -= SIZE;

            return [
                i,        i + 1,
                i + SIZE, i + SIZE + 1
            ];
        case "farm":
            if (col === SIZE - 1) i--;
            if (row === SIZE - 1) i -= SIZE;

            return [
                i,        i + 1,
                i + SIZE, i + SIZE + 1
            ];
        default:
            return [];
    }
}