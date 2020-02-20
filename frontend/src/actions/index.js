export const BUY_BUILDING = "BUY_BUILDING";
export const SELL_BUILDING = "SELL_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const NEXT_TURN = "NEXT_TURN";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";
export const SET_DIFF = "SET_DIFF";

export function buyBuilding(id, cellsArray, changeValue) {
    return {
        type: BUY_BUILDING,
        id: id,
        cells: cellsArray,
        changeValue: changeValue,
    }
}

export function changeDiff(difficulty) {
    return {
        type: SET_DIFF,
        id: difficulty,
    }
}

export function sellBuilding(id) {
    return {
        type: SELL_BUILDING,
        id: id,
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

export function cellMouseEnter(i) {
    return {
        type: CELL_MOUSE_ENTER,
        i: i,
    }
}

export function cellMouseClick(i) {
    return {
        type: CELL_MOUSE_CLICK,
        i: i,
    }
}