import {MONEY, WOOD} from "./Resources";
import {LAND, SEA} from "./Map";

export const ANIMAL_FARM = "animalFarm";
export const FISHING_BOAT = "fishingBoat";
export const HUNTING_SHACK = "huntingShack";
export const CHEAP_LUMBER_MILL = "cheapLumberMill";
export const EXPENSIVE_LUMBER_MILL = "expensiveLumberMill";

//TODO define affectedDataTypes for each building type.
export default {
    [ANIMAL_FARM]: {
        name: "Animal Farm",
        description: "Rear animals to produce food.",
        requiredCellType: LAND,
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
        affectedDataTypes: [],
    },
    [FISHING_BOAT]: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        requiredCellType: SEA,
        costs: {
            [WOOD]: 200,
            [MONEY]: 100,
        },
        affectedDataTypes: [],
    },
    [HUNTING_SHACK]: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        requiredCellType: LAND,
        costs: {
            [WOOD]: 100,
            [MONEY]: 400,
        },
        affectedDataTypes: [],
    },
    [CHEAP_LUMBER_MILL]: {
        name: "Cheap Lumber Mill",
        description: "Cuts down trees to produce wood. Substantial impact on the ecosystem.",
        requiredCellType: LAND,
        costs: {},
        affectedDataTypes: [],
    },
    [EXPENSIVE_LUMBER_MILL]: {
        name: "Expensive Lumber mill",
        description: "Cuts down trees to produce wood sustainably.",
        requiredCellType: LAND,
        costs: {},
        affectedDataTypes: [],
    },
};