const WOOD = "wood";
const MONEY = "money";
const FOOD = "food";

export const buildings = {
    animalFarm: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        costs: [
            {resource: WOOD, amount: 200},
            {resource: MONEY, amount: 100},
        ],
        effects: [
            {resource: FOOD, income: 100},
        ],
    },
    fishingBoat: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        costs: [
            {resource: WOOD, amount: 200},
            {resource: MONEY, amount: 100},
        ],
        effects: [],
    },
    huntingShack: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        costs: [
            {resource: WOOD, amount: 100},
            {resource: MONEY, amount: 400},
        ],
        effects: [
            {resource: FOOD, income: 100},
        ],
    },
    cheapLumberMill: {
        name: "Cheap Lumber Mill",
        description: "Cuts down trees to produce wood. Substantial impact on the ecosystem.",
        costs: [],
        effects: [],
    },
    expensiveLumberMill: {
        name: "Expensive Lumber mill",
        description: "Cuts down trees to produce wood sustainably.",
        costs: [],
        effects: [],
    },
};