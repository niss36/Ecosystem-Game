import buildings, {CHEAP_LUMBER_MILL, EXPENSIVE_LUMBER_MILL, PLANTING_TREES} from "../definitions/Buildings";
import {FOREST, LAND, SIZE} from "../definitions/Map";

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
export const CHANGE_OVERLAY = "CHANGE_OVERLAY";
export const CHANGE_CELL_TYPE = "CHANGE_CELL_TYPE";

/**
 * Action creators
 */

function getDataFunction(state){
    //TODO Call Next Function API
    let efforts = new Array(SIZE * SIZE);
    let sizes = new Array(SIZE * SIZE);
    for(let i = 0; i < state().map.cells.length; i++){
        efforts[i] = state().map.cells[i].effort;
        sizes[i] = state().map.cells[i].size;
    }
    let JSONToSend = {
        harvestEffort: efforts,
        lowerHarvestBodymass: sizes,
        timestep: 12,
        warming: 0.0,
    };

    return {
        biodiversityScores: [],
        harvestedBiomasses: [],
        meanHarvestedBiomass: 0.0,
        state: {
            herbivoreBiomasses: [1],
            herbivoreAbundances: [2],
            carnivoreBiomasses: [1],
            carnivoreAbundances: [2],
            temperature: 0.0,
            timeElapsed: 12,
        },
    }; //TODO replace with returned values.
}

function initialAPICall(){
    //TODO call initial in python
    return {
        biodiversityScores: [],     //Should be uninitialised
        harvestedBiomasses: [],     //Should be uninitialised
        meanHarvestedBiomass: 0.0,  //Should be uninitialised
        state: {
            herbivoreBiomasses: [1],
            herbivoreAbundances: [2],
            carnivoreBiomasses: [1],
            carnivoreAbundances: [2],
            temperature: 0.0,
            timeElapsed: 12,
        },
    }; //TODO replace with returned state from API
}

export function loading(initial) {
    return (dispatch, getState) => {
        dispatch({
            type: NEXT_TURN_LOADING,
            initial: initial,
        });

        return new Promise(resolve => {
            getDataFunction(getState);
            setTimeout(resolve, 0);
        }).then(() => {
            dispatch(getData(initial));
        });
    };
}

export function getData(initial){
    return (dispatch, getState) => {
        if(initial){
            const data = initialAPICall(getState);
            dispatch({
                type: START_GAME,
                data: data,
            });
        }
        else{
            const data = getDataFunction(getState);
            dispatch({
                type: NEXT_TURN,
                data: data,
            });

            const state = getState();
            const {cells, cellTypes} = state.map;

            for (let i = 0; i < SIZE * SIZE; i++) {
                if (cellTypes[i] === FOREST) {
                    if (cells[i].type === CHEAP_LUMBER_MILL) {
                        if (Math.random() > 0.7) {
                            dispatch(endRemoveBuilding(CHEAP_LUMBER_MILL, [i], true));
                            dispatch(changeCellType(i, LAND));
                        }
                    } else if (cells[i].type === EXPENSIVE_LUMBER_MILL) {
                        if (Math.random() > 0.9) {
                            dispatch(endRemoveBuilding(EXPENSIVE_LUMBER_MILL, [i], true));
                            dispatch(changeCellType(i, LAND));
                        }
                    }
                } else if (cellTypes[i] === LAND) {
                    if (cells[i].type === PLANTING_TREES) {
                        if (Math.random() > 0.9) {
                            dispatch(endRemoveBuilding(PLANTING_TREES, [i], true));
                            dispatch(changeCellType(i, FOREST));
                        }
                    }
                }
            }
        }
    }
}
export function changeOverlay(newOverlay) {
    return {
        type: CHANGE_OVERLAY,
        newOverlay: newOverlay
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

export function endBuyBuilding(id, selectedCells) {
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
            size: size,
            effort: effort,
        });
    }
}

export function endRemoveBuilding(id, selectedCells, noRefund) {
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
            noRefund: noRefund,
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

export function logChangeDisplayed(indexNew){
    return{
        type: LOG_CHANGE_DISPLAYED,
        index: indexNew,
    }
}

export function changeCellType(i, newCellType) {
    return {
        type: CHANGE_CELL_TYPE,
        i: i,
        newCellType: newCellType,
    }
}