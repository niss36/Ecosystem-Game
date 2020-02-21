import {
    END_BUY_BUILDING,
    CELL_MOUSE_ENTER,
    CELL_MOUSE_CLICK,
    NEXT_TURN,
    START_BUY_BUILDING, START_REMOVE_BUILDING, END_REMOVE_BUILDING, LOG_ITEM_CONFIRM
} from "../actions";


import buildings from "../definitions/Buildings";
import {LAND, SIZE} from "../definitions/Map";

import {getSelection} from "../definitions/Util";

function makeFilter(state) {
    // assert mode not undefined

    const {mode, building} = state.selection;

    const requiresLand = buildings[building].requiredCellType === LAND;

    // requiresLand iff cell i is land.
    const doesLandMatch = i => requiresLand === state.island.includes(i);

    switch (mode) {
        case "add":
            return i => doesLandMatch(i) && !state.cells[i];

        case "remove":
            return i => doesLandMatch(i) && state.cells[i] === building;
    }
}

/**
 * Gets the list of cells potentially selected around cell `i` based on which building we're considering,
 * and filters it based on cell type (land or sea) and contents (if adding, check it is empty; if removing,
 * check it contains the same building type).
 */
function getFilteredSelection(i, state) {
    // assert mode not undefined
    return getSelection(i, state.selection.building).filter(makeFilter(state));
}

const initialState = {
    selection: {mode: undefined, building: undefined, cells: []},
    island: [210, 211, 231, 271, 251, 270, 269, 250, 230, 247, 229, 249, 209, 227, 189, 188, 190, 192, 228, 232, 191, 208, 212, 206, 252, 272, 246, 187, 245, 207, 226, 168, 170, 169, 171, 293, 292, 268, 266, 248, 290, 291, 287, 310, 307, 289, 306, 308, 267, 309, 286, 288, 311, 312, 233, 213, 173, 153, 174, 175, 176, 196, 217, 216, 236, 172, 152, 193, 154, 235, 197, 329, 330, 331, 326, 265, 305, 225, 186, 149, 151, 150, 131, 132, 304, 325, 166, 148, 108, 128, 110, 109, 130, 89, 88, 90, 129, 111, 107, 127, 87, 106, 86, 105, 125, 124, 165, 163, 185, 205, 224, 184, 164, 204, 69, 68, 63, 62, 82, 42, 34, 55, 36, 57, 56, 76, 54, 75, 195, 155, 156, 135, 134, 133, 112, 113, 92, 317, 316, 336, 356, 337, 335],
    // TODO maybe change data structure (eg with a set)
    cells: new Array(SIZE * SIZE),
};

export function map(state = initialState, action) {
    switch (action.type) {
        case NEXT_TURN: {
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};
            return {...state, selection: nextSelection, cells: []};
        }

        case START_BUY_BUILDING: {
            let nextBuilding = action.id;
            console.log(nextBuilding);
            return {...state, selection: {...state.selection, mode: "add", building: nextBuilding, cells: []}};
        }

        case START_REMOVE_BUILDING: {
            let nextBuilding = action.id;
            console.log(nextBuilding);
            return {...state, selection: {...state.selection, mode: "remove", building: nextBuilding, cells: []}};
        }

        case END_BUY_BUILDING: {
                const nextCells = [...state.cells];
            if (action.isLog === undefined) {
                for (const x of state.selection.cells) {
                    nextCells[x] = state.selection.building;
                }
            }
            else{
                for (const x of action.selectedCells){
                    nextCells[x] = action.id;
                }
            }
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};
            return {...state, selection: nextSelection, cells: nextCells};
        }

        case END_REMOVE_BUILDING: {
            const nextCells = [...state.cells];
            if (action.isLog === undefined) {
                for (const x of state.selection.cells) {
                    nextCells[x] = undefined;
                }
            }
            else{
                for (const x of action.selectedCells){
                    nextCells[x] = undefined;
                }
            }
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};
            return {...state, selection: nextSelection, cells: nextCells};
        }

        case CELL_MOUSE_CLICK: //ONLY RUNS WHEN NOT ON MODE
            // temp code to change map
            let nextIsland;
            if (!state.island.includes(action.i)) {
                nextIsland = [...state.island, action.i];
            } else {
                nextIsland = state.island.filter(item => item !== action.i);
            }

            let log = "[";
            for (const x of nextIsland) {
                log += x + ",";
            }
            log += "]";
            console.log(log);

            return {...state, island: nextIsland};

        case CELL_MOUSE_ENTER:
            if (state.selection.mode) { // if not undefined
                const selectedCells = getFilteredSelection(action.i, state);

                return {...state, selection: {...state.selection, cells: selectedCells}};
            }

            return state;
        default:
            return state;
        }
    }