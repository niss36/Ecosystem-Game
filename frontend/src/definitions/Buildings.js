import {MONEY, WOOD} from "./Resources";

export const ANIMAL_FARM = "animalFarm";
export const FISHING_BOAT = "fishingBoat";
export const HUNTING_SHACK = "huntingShack";
export const CHEAP_LUMBER_MILL = "cheapLumberMill";
export const EXPENSIVE_LUMBER_MILL = "expensiveLumberMill";

export default {
    [ANIMAL_FARM]: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
    },
    [FISHING_BOAT]: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
    },
    [HUNTING_SHACK]: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        costs: {
            [WOOD]: 100,
            [MONEY]: 400,
        },
    },
    [CHEAP_LUMBER_MILL]: {
        name: "Cheap Lumber Mill",
        description: "Cuts down trees to produce wood. Substantial impact on the ecosystem.",
        costs: {},
    },
    [EXPENSIVE_LUMBER_MILL]: {
        name: "Expensive Lumber mill",
        description: "Cuts down trees to produce wood sustainably.",
        costs: {},
    },
};