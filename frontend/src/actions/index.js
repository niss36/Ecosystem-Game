export const START_REMOVE_BUILDING = "START_REMOVE_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const NEXT_TURN = "NEXT_TURN";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";
export const SET_DIFF = "SET_DIFF";
export const END_BUY_BUILDING = "END_BUY_BUILDING";
export const START_BUY_BUILDING = "START_BUY_BUILDING";
export const END_REMOVE_BUILDING = "END_REMOVE_BUILDING";

export function endBuyBuilding(id,selectedCells) {
    return {
        type: END_BUY_BUILDING,
        id: id,
        selectedCells: selectedCells,
    }
}
export const SET_DIFFICULTY = "SET_DIFFICULTY";

export function startBuyBuilding(id) {
    return {
        type: START_BUY_BUILDING,
        id: id,
        // cells: cellsArray,
        // changeValue: changeValue,
    }
}

export function endRemoveBuilding(id,selectedCells) {
    return {
        type: END_REMOVE_BUILDING,
        id: id,
        selectedCells: selectedCells,
    }
}

export function startRemoveBuilding(id) {
    return {
        type: START_REMOVE_BUILDING,
        id: id,
    }
}
export function changeDiff(difficulty) {
    return {
        type: SET_DIFF,
        id: difficulty,
    }
}




export function setEffort(id, effort) {
    return {
        type: SET_EFFORT,
        id: id,
        effort: effort,
    }
}

export function nextTurn() {
    return {
        type: NEXT_TURN,
    }
}

export function setDifficulty(difficulty) {
    return {
        type: SET_DIFFICULTY,
        id: difficulty,
    }
}

export function cellMouseEnter(i) {
    return {
        type: CELL_MOUSE_ENTER,
        i: i,
    }
}

export function cellMouseClickNotMode(i) {
    return {
        type: CELL_MOUSE_CLICK,
        i: i,
    }
}

export function cellMouseClick(i) {

    return (dispatch, getState) => {
        const state = getState();
        const {mode, building, cells} = state.map.selection;

        if (mode === "add") { // buying buildings
            dispatch(endBuyBuilding(building, cells));
        } else if (mode === "remove") { // removing buildings
            dispatch(endRemoveBuilding(building, cells));
        } else { // mode undefined or invalid
            dispatch(cellMouseClickNotMode(i));
        }
    }
}