import buildings from "./Buildings";
import {SIZE} from "./Map";

export function getIncome(resourceId, state) {
    let total = 0;

    const breakdown = {};

    for (const [building, buildingState] of Object.entries(state.buildings)) {

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

export function numCanBuy(buildingId, state) {
    const costs = buildings[buildingId].costs;

    let max = Infinity;

    for (const [resource, cost] of Object.entries(costs)) {
        const num = Math.floor(state.resources[resource].amount / cost);
        if (num < max)
            max = num;
    }

    return max;
}

export function getSelection(i, building) {
    const [row, col] = [Math.floor(i / SIZE), i % SIZE];

    switch (buildings[building].selectionSize) {
        case 3:
            if (col === 0) i++;
            if (col === SIZE - 1) i--;
            if (row === 0) i += SIZE;
            if (row === SIZE - 1) i -= SIZE;

            return [
                i - SIZE - 1, i - SIZE, i - SIZE + 1,
                i - 1,        i,        i + 1,
                i + SIZE - 1, i + SIZE, i + SIZE + 1
            ];

        case 2:
            if (col === SIZE - 1) i--;
            if (row === SIZE - 1) i -= SIZE;

            return [
                i,        i + 1,
                i + SIZE, i + SIZE + 1
            ];

        case 1:
            return [i];

        default:
            return [];
    }
}