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