import {
    NEXT_TURN,
    START_BUY_BUILDING,
    START_REMOVE_BUILDING,
    END_BUY_BUILDING,
    END_REMOVE_BUILDING,
    CELL_MOUSE_ENTER,
    LOG_ITEM_SELECT,
    LOG_CHANGE_DISPLAYED,
    CHANGE_CELL_INFO,
    CHANGE_OVERLAY,
    CHANGE_CELL_TYPE,
    CELL_MOUSE_CLICK
} from "../actions";

import buildings from "../definitions/Buildings";
import {FOREST, LAND, SEA, SIZE} from "../definitions/Map";

import {getSelection, numCanBuy} from "../definitions/Util";

function makeFilter(state) {
    // assert mode not undefined

    const {mode, building} = state.selection;

    const doesCellTypeMatch = i => buildings[building].requiredCellType === state.cellTypes[i];

    switch (mode) {
        case "add":
            return i => doesCellTypeMatch(i) && !(state.cells[i].type);

        case "remove":
            // the prob is it can be undefined
            return i => doesCellTypeMatch(i) && (state.cells[i].type === building);

        default:
            throw new Error("Unknown mode " + mode);
    }
}

/**
 * Gets the list of cells potentially selected around cell `i` based on which building we're considering,
 * and filters it based on cell type (land or sea) and contents (if adding, check it is empty; if removing,
 * check it contains the same building type).
 */
function getFilteredSelection(i, state) {
    // assert mode not undefined
    return getSelection(i, state.selection.building, state.selection.mode === "add" && state.selection.buyOne).filter(makeFilter(state));
}

function makeInitialMap () {
    const island = new Set([210, 211, 231, 271, 251, 270, 269, 250, 230, 247, 229, 249, 209, 227, 189, 188, 190, 192, 228, 232, 191, 208, 212, 206, 252, 272, 246, 187, 245, 207, 226, 168, 170, 169, 171, 293, 292, 268, 266, 248, 290, 291, 287, 310, 307, 289, 306, 308, 267, 309, 286, 288, 311, 312, 233, 213, 173, 153, 174, 175, 176, 196, 217, 216, 236, 172, 152, 193, 154, 235, 197, 329, 330, 331, 326, 265, 305, 225, 186, 149, 151, 150, 131, 132, 304, 325, 166, 148, 108, 128, 110, 109, 130, 89, 88, 90, 129, 111, 107, 127, 87, 106, 86, 105, 125, 124, 165, 163, 185, 205, 224, 184, 164, 204, 69, 68, 63, 62, 82, 42, 34, 55, 36, 57, 56, 76, 54, 75, 195, 155, 156, 135, 134, 133, 112, 113, 92, 317, 316, 336, 356, 337, 335]);

    const cellTypes = new Array(SIZE * SIZE);
    const sameCellTypes = new Array(SIZE * SIZE);

    for (let x = 0; x < SIZE * SIZE; x++) {
        if (island.has(x)) {
            if (Math.random() < 0.3) {
                cellTypes[x] = FOREST;
            } else {
                cellTypes[x] = LAND;
            }

            sameCellTypes[x] = {
                top: island.has(x - SIZE),
                right: island.has(x + 1),
                bottom: island.has(x + SIZE),
                left: island.has(x - 1),
            };
        } else {
            cellTypes[x] = SEA;

            sameCellTypes[x] = {
                top: !island.has(x - SIZE),
                right: !island.has(x + 1),
                bottom: !island.has(x + SIZE),
                left: !island.has(x - 1),
            };
        }
    }
    let cells = new Array(SIZE * SIZE);
    for (let x = 0; x < SIZE * SIZE; x++) {
        cells[x] = {type: undefined, size: undefined, effort: undefined};
    }

    return {
        selection: {mode: undefined, building: undefined, cells: []},
        cellTypes: cellTypes,
        cells: cells,
        builtThisTurn: new Set(),
        sameCellTypes: sameCellTypes,
        logSelection: {building: undefined, cells: []},
        overlay: undefined,
        cellClicked: undefined,
        data: undefined,
    };
}

export function map(state = makeInitialMap(), action) {
    switch (action.type) {
        case CHANGE_OVERLAY:
            return {...state, overlay: action.newOverlay};
        case NEXT_TURN: {
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};

            return {
                ...state,
                selection: nextSelection,
                builtThisTurn: new Set(),
                logSelection: {building: undefined, cells: []},
            };
        }

        case START_BUY_BUILDING: {
            return {...state, selection: {...state.selection, mode: "add", building: action.id, buyOne: action.buyOne, cells: []}};
        }

        case START_REMOVE_BUILDING: {
            return {...state, selection: {...state.selection, mode: "remove", building: action.id, cells: []}};
        }

        case END_BUY_BUILDING: {
            const nextCells = [...state.cells];
            const nextBuiltThisTurn = new Set(state.builtThisTurn);
            for (const x of action.selectedCells) {
                nextCells[x] = {type: state.selection.building, size: action.size, effort: action.effort};//TODO change size and num
                nextBuiltThisTurn.add(x);
            }
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};
            return {...state, selection: nextSelection, cells: nextCells, builtThisTurn: nextBuiltThisTurn};
        }

        case END_REMOVE_BUILDING: {
            const nextCells = [...state.cells];
            const nextBuiltThisTurn = new Set(state.builtThisTurn);
            for (const x of action.selectedCells) {
                nextCells[x] = {...state.cells[x],type: undefined,size : undefined, effort: undefined};
                nextBuiltThisTurn.delete(x);
            }
            const nextSelection = {...state.selection, mode: undefined, building: undefined, cells: []};
            return {...state, selection: nextSelection, cells: nextCells, builtThisTurn: nextBuiltThisTurn};
        }

        case CELL_MOUSE_ENTER:
            if (state.selection.mode) { // if not undefined
                let selectedCells = getFilteredSelection(action.i, state);
                if (state.selection.mode === "add") { // Check how many we can buy.
                    const num = numCanBuy(state.selection.building, action.state);
                    selectedCells = selectedCells.slice(0, num);
                }

                return {...state, selection: {...state.selection, cells: selectedCells}};
            }

            return state;
        case LOG_ITEM_SELECT:
            const building = action.buildingType;
            const selectedCells = action.selectedHighlight;
            let newLogSelection = {building: building, cells: selectedCells};
            if (selectedCells === state.logSelection.cells && building === state.logSelection.building) {
                return {...state, logSelection: {building: undefined, cells: []}};
            } else {
                return {...state, logSelection: newLogSelection};
            }
        case LOG_CHANGE_DISPLAYED:
            return {...state, logSelection: {building: undefined, cells: []}};
        case CHANGE_CELL_INFO:
            let newCells = [...state.cells];
            if (action.slider === "effort") {
                newCells[action.cellNo] = {...newCells[action.cellNo], effort: action.newValue}
            }
            if (action.slider === "size") {
                newCells[action.cellNo] = {...newCells[action.cellNo], size: action.newValue}
            }
            return {...state, cells: newCells};
        case CHANGE_CELL_TYPE: {
            const nextCellTypes = [...state.cellTypes];
            nextCellTypes[action.i] = action.newCellType;
            return {...state, cellTypes: nextCellTypes};
        }
        case CELL_MOUSE_CLICK:
            if (state.cellClicked && action.i === state.cellClicked) { // dupiate code to cellinfo but lazy af
                return {...state, cellClicked: undefined};
            }
            return {...state, cellClicked: action.i};
        default:
            return state;
    }
}