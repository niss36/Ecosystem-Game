import {
    END_BUY_BUILDING,
    CELL_MOUSE_ENTER,
    CELL_MOUSE_CLICK,
    NEXT_TURN,
    START_BUY_BUILDING,
    endBuyBuilding
} from "../actions";


import {ANIMAL_FARM, FISHING_BOAT, HUNTING_SHACK} from "../definitions/Buildings";

import {getSelection} from "../definitions/Util";
import {SIZE} from "../definitions/Map";

const filters = {
    [FISHING_BOAT]: land => !land,
    [HUNTING_SHACK]: land => land,
    [ANIMAL_FARM]: land => land,
};

function getFilteredSelection(i, mode, island) {
    return getSelection(i, mode)
        .filter(i => filters[mode](island.includes(i)));
}


const initialState = {
    selection: {mode: undefined, cells: []},
    island: [210, 211, 231, 271, 251, 270, 269, 250, 230, 247, 229, 249, 209, 227, 189, 188, 190, 192, 228, 232, 191, 208, 212, 206, 252, 272, 246, 187, 245, 207, 226, 168, 170, 169, 171, 293, 292, 268, 266, 248, 290, 291, 287, 310, 307, 289, 306, 308, 267, 309, 286, 288, 311, 312, 233, 213, 173, 153, 174, 175, 176, 196, 217, 216, 236, 172, 152, 193, 154, 235, 197, 177, 329, 330, 331, 326, 265, 305, 225, 186, 149, 151, 150, 131, 132, 304, 325, 166, 148, 108, 128, 110, 109, 130, 89, 88, 90, 129, 111, 107, 127, 87, 106, 86, 105, 125, 124, 165, 163, 185, 205, 224, 184, 164, 204, 69, 68],
    cells: new Array(SIZE * SIZE),
};


export function map(state = initialState, action) {
    switch (action.type) {
        case START_BUY_BUILDING:
            let nextMode = action.id;
            console.log(nextMode);
            return {...state, selection: {...state.selection, mode: nextMode, cells: []}};

        case END_BUY_BUILDING:

            let newcells = [...state.cells];
            switch (state.selection.mode) {
                case FISHING_BOAT:
                    for (const x of state.selection.cells) {
                        newcells[x] = FISHING_BOAT;
                    }
                    return {...state, selection: {mode: undefined, cells: []}, cells: newcells};
                case HUNTING_SHACK:
                    for (const x of state.selection.cells) {
                        newcells[x] = HUNTING_SHACK;
                    }
                    return {...state, selection: {mode: undefined, cells: []}, cells: newcells};
            }

        case CELL_MOUSE_CLICK: //ONLY RUNS WHEN NOT ON MODE
            // temp code to change map
            let nextIsland;
            if (!state.island.includes(action.i)) {
                nextIsland = [...state.island, action.i];
            } else {
                nextIsland = state.island.filter(item => item !== action.i);
            }
            const nextSelection = getFilteredSelection(action.i, state.selection.mode, nextIsland);
            let log = "[";
            for (const x of nextIsland) {
                log += x + ",";
            }
            log += "]";
            console.log(log);
            return {...state, island: nextIsland, selection: {...state.selection, cells: nextSelection}};
        case CELL_MOUSE_ENTER:
            if (state.selection.mode) { // if not undefined...
                const selectedCells = getFilteredSelection(action.i, state.selection.mode, state.island);
                return {...state, selection: {...state.selection, cells: selectedCells}};
            }
            return state;

        default:
            return state;
    }
}