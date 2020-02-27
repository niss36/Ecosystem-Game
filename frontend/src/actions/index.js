import buildings from "../definitions/Buildings";

/**
 * Action types
 */

export const START_GAME = "START_GAME";
export const NEXT_TURN = "NEXT_TURN";
export const GET_DATA_INITIAL = "GET_DATA_INITIAL";
export const NEXT_TURN_LOADING = "NEXT_TURN_LOADING";
export const START_BUY_BUILDING = "START_BUY_BUILDING";
export const START_REMOVE_BUILDING = "START_REMOVE_BUILDING";
export const END_BUY_BUILDING = "END_BUY_BUILDING";
export const END_REMOVE_BUILDING = "END_REMOVE_BUILDING";
export const CHANGE_SLIDERS = "CHANGE_SLIDERS";
export const SET_TAXES = "SET_TAXES";
export const SET_RATIONING = "SET_RATIONING";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";
export const SET_DIFFICULTY = "SET_DIFFICULTY";
export const LOG_ITEM_SELECT = "LOG_ITEM_SELECT";
export const LOG_ITEM_CONFIRM = "LOG_ITEM_CONFIRM";
export const LOG_CHANGE_DISPLAYED = "LOG_CHANGE_DISPLAYED";
export const CHANGE_CELL_INFO = "CHANGE_CELL_INFO";

/**
 * Action creators
 */

function getDataFunction(state){
    //TODO get data;
    return 0.0;
}

export function startGame() {
    return (dispatch, getState) => {
        dispatch({type: NEXT_TURN_LOADING});

        const data = getDataFunction(getState());

        dispatch({
            type: START_GAME,
            data: data,
        });
    };
}

export function nextTurn() {
    return (dispatch, getState) => {
        dispatch({type: NEXT_TURN_LOADING});

        const data = getDataFunction(getState());

        dispatch({
            type: NEXT_TURN,
            data: data,
        });
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
    return (dispatch,getState) => {
        const state = getState();
        let size = undefined;
        let effort= undefined;
        if (buildings[id].requireSilder) {
            size = state.buildings[id].size;
            effort = state.buildings[id].effort;
        }

        dispatch({
            type: END_BUY_BUILDING,
            id: id,
            selectedCells: selectedCells,
            isLog: isLog,
            size: size,
            effort: effort,
        });
    }
}

export function endRemoveBuilding(id,selectedCells, isLog) {
    return (dispatch, getState) => {
        const state = getState();

        let builtThisTurn = 0;
        for (const cell of selectedCells) {
            if (state.map.builtThisTurn.has(cell)) {
                builtThisTurn++;
            }
        }

        dispatch({
            type: END_REMOVE_BUILDING,
            id: id,
            selectedCells: selectedCells,
            builtThisTurn: builtThisTurn,
            isLog: isLog,
        });
    };
}

export function changeSliders(id,slider, newValue) {
    return {
        type: CHANGE_SLIDERS,
        id: id,
        slider: slider,
        newValue: newValue,
    }
}

export function changeCellInfo(cellNo,slider, newValue,) {
    return {
        type: CHANGE_CELL_INFO,
        slider: slider,
        cellNo: cellNo,
        newValue: newValue,
    }
}

export function setTaxes(taxes) {
    return {
        type: SET_TAXES,
        taxes: taxes,
    }
}

export function setRationing(rationing) {
    return {
        type: SET_RATIONING,
        rationing: rationing,
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

export function logItemSelect(selectedHighlight, buildingType, actionType){
    return {
        type: LOG_ITEM_SELECT,
        selectedHighlight: selectedHighlight,
        buildingType: buildingType,
        actionType: actionType,
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

export function logChangeDisplayed(indexNew){
    return{
        type: LOG_CHANGE_DISPLAYED,
        index: indexNew,
    }
}