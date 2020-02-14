import {MONEY, WOOD} from "./Resources";

export default {
    animalFarm: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
    },
    fishingBoat: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
    },
    huntingShack: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        costs: {
            [WOOD]: 100,
            [MONEY]: 400,
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