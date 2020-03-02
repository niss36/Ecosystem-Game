import {MONEY, WOOD} from "./Resources";
import {LAND, SEA,FOREST} from "./Map";

export const FISHING_BOAT = "fishingBoat";
export const HUNTING_SHACK = "huntingShack";
export const CHEAP_LUMBER_MILL = "cheapLumberMill";
export const EXPENSIVE_LUMBER_MILL = "expensiveLumberMill";
export const SETTLEMENT = "settlement";
export const PLANTING_TREES ="planting";

export default {
    [FISHING_BOAT]: {
        name: "Fishing Boat",
        description: "A boat to catch fish in the ocean.",
        requiredCellType: SEA,
        selectionSize: 3,
        costs: {
            [WOOD]: 170,
            [MONEY]: 100,
        },
        affectedDataTypes: [],
        requireSilder: true,
    },
    [HUNTING_SHACK]: {
        name: "Hunting Shack",
        description: "Hire hunters to harvest wild animals.",
        requiredCellType: LAND,
        selectionSize: 2,
        costs: {
            [WOOD]: 100,
            [MONEY]: 500,
        },
        affectedDataTypes: [],
        requireSilder: true,
    },
    [CHEAP_LUMBER_MILL]: {
        name: "Cheap Lumber Mill",
        description: "Cuts down trees to produce wood. Substantial impact on the ecosystem.",
        requiredCellType: FOREST,
        selectionSize: 3,
        costs: {
            [WOOD]: 20,
            [MONEY]: 300,
        },
        affectedDataTypes: [],
        requireSilder: false,
    },
    [EXPENSIVE_LUMBER_MILL]: {
        name: "Expensive Lumber mill",
        description: "Cuts down trees to produce wood sustainably.",
        requiredCellType: FOREST,
        selectionSize: 3,
        costs: {
            [WOOD]: 20,
            [MONEY]: 1200,
        },
        affectedDataTypes: [],
        requireSilder: false,
    },
    [SETTLEMENT]: {
        name: "Settlement",
        description: "Provides housing for more people.",
        requiredCellType: LAND,
        selectionSize: 2,
        costs: {
            [WOOD]: 1500,
            [MONEY]: 1500,
        },
        affectedDataTypes: [],
        requireSilder: false,
    },
    [PLANTING_TREES]:{
        name: "Tree Planting",
        description:"Plant some trees.",
        requiredCellType:LAND,
        selectionSize: 3,
        costs:{
            [MONEY]:100
        },
        affectedDataTypes:[],
    }
};