export const BUY_BUILDING = "BUY_BUILDING";
export const START_BUY_BUILDING = "START_BUY_BUILDING";
export const END_BUY_BUILDING = "END_BUY_BUILDING";
export const SELL_BUILDING = "SELL_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const NEXT_TURN = "NEXT_TURN";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";
export const SET_DIFFICULTY = "SET_DIFFICULTY";

export function startBuyBuilding(id) {
    return {
        type: START_BUY_BUILDING,
        id: id,
    }
}

export function endBuyBuilding(id) {
    return {
        type: END_BUY_BUILDING,
        id: id,
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

export function cellMouseClick(i) {
    return (dispatch, getState) => {
        const state = getState();
        const mode = state.map.selection.mode;
        if (mode) {
            dispatch(endBuyBuilding(mode));
        } else {
            dispatch({
                type: CELL_MOUSE_CLICK,
                i: i,
            });
        }
    }
}