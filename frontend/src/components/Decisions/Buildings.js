const WOOD = "wood";
const MONEY = "money";
const FOOD = "food";

export const buildings = {
    animalFarm: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        costs: {
            wood: 200,
            money: 100,
        },
    },
    fishingBoat: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        costs: {
            wood: 200,
            money: 100,
        },
    },
    huntingShack: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        costs: {
            wood: 100,
            money: 400,
        },
    },
    cheapLumberMill: {
        name: "Cheap Lumber Mill",
        description: "Cuts down trees to produce wood. Substantial impact on the ecosystem.",
        costs: {},
    },
    expensiveLumberMill: {
        name: "Expensive Lumber mill",
        description: "Cuts down trees to produce wood sustainably.",
        costs: {},
    },
};