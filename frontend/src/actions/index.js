/**
 * Action types
 */

export const NEXT_TURN = "NEXT_TURN";
export const START_BUY_BUILDING = "START_BUY_BUILDING";
export const START_REMOVE_BUILDING = "START_REMOVE_BUILDING";
export const END_BUY_BUILDING = "END_BUY_BUILDING";
export const END_REMOVE_BUILDING = "END_REMOVE_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const SET_TAXES = "SET_TAXES";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";
export const SET_DIFFICULTY = "SET_DIFFICULTY";
export const LOG_ITEM_SELECT = "LOG_ITEM_SELECT";
export const LOG_ITEM_CONFIRM = "LOG_ITEM_CONFIRM";

/**
 * Action creators
 */

export function nextTurn() {
    return {
        type: NEXT_TURN,
    }
}

export function startBuyBuilding(id) {
    return {
        type: START_BUY_BUILDING,
        id: id,
    }
}

export function startRemoveBuilding(id) {
    return {
        type: START_REMOVE_BUILDING,
        id: id,
    }
}

export function endBuyBuilding(id,selectedCells, isLog) {
    return {
        type: END_BUY_BUILDING,
        id: id,
        selectedCells: selectedCells,
        isLog: isLog
    }
}

export function endRemoveBuilding(id,selectedCells, isLog) {
    return {
        type: END_REMOVE_BUILDING,
        id: id,
        selectedCells: selectedCells,
        isLog: isLog,
    }
}

export function setEffort(id, effort) {
    return {
        type: SET_EFFORT,
        id: id,
        effort: effort,
    }
}

export function setTaxes(taxes) {
    return {
        type: SET_TAXES,
        taxes: taxes,
    }
}

export function cellMouseEnter(i) {

    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: CELL_MOUSE_ENTER,
            i: i,
            state: state, // TODO
        });
    };
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

export function cellMouseClickNotMode(i) {
    return {
        type: CELL_MOUSE_CLICK,
        i: i,
    }
}

export function setDifficulty(difficulty) {
    return {
        type: SET_DIFFICULTY,
        id: difficulty,
    }
}

export function logItemSelect(index){
    return {
        type: LOG_ITEM_SELECT,
        index: index,
    }
}

export function logItemConfirm(index, selectedDel, dispatch){

    return () => {
        if(selectedDel !== undefined) {
            for (let x = selectedDel.length - 1; x >= 0; x--) {
                if (selectedDel[x].actionType === 'Buy') {
                    dispatch(endRemoveBuilding(selectedDel[x].buildingType, selectedDel[x].selectedCells, true))
                } else {
                    dispatch(endBuyBuilding(selectedDel[x].buildingType, selectedDel[x].selectedCells, true))
                }
            }
        }
        dispatch({
            type: LOG_ITEM_CONFIRM,
            selectedDel: selectedDel,
            index: index,
        })
    };
}