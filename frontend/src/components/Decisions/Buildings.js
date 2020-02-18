const WOOD = "wood";
const MONEY = "money";
const FOOD = "food";

export const buildings = {
    animalFarm: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        costs: [
            {resource: WOOD,amount: 200,icon:"/logs.svg",},
            {resource: MONEY, amount: 100,icon:"/coin.svg"},
        ],
        effects: [
            {resource: FOOD, income: 100,icon:"/meat.svg"},
        ],
    },
    fishingBoat: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        costs: [
            {resource: WOOD, amount: 200,icon:"/logs.svg"},
            {resource: MONEY, amount: 100,icon:"/coin.svg"},
        ],
        effects: [],
    },
    huntingShack: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        costs: [
            {resource: WOOD, amount: 100,icon:"/logs.svg"},
            {resource: MONEY, amount: 400,icon:"/coin.svg"},
        ],
        effects: [
            {resource: FOOD, income: 100,icon:"/meat.svg"},
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