export const BUY_BUILDING = "BUY_BUILDING";
export const SELL_BUILDING = "SELL_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const NEXT_TURN = "NEXT_TURN";
export const PUT_CHANGE = "PUT_CHANGE";
export const PUT_ANIMAL = "PUT_ANIMAL";
export const CELL_MOUSE_ENTER = "CELL_MOUSE_ENTER";
export const CELL_MOUSE_CLICK = "CELL_MOUSE_CLICK";

export function buyBuilding(id) {
    return {
        type: BUY_BUILDING,
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

export function putAnimalDataChange(cellsArray, dataType, animalType, changeValue){
    return{
        type: PUT_ANIMAL,
        dataType: dataType,
        cells: cellsArray,
        animalType: animalType,
        changeValue: changeValue,
    }
}

export function putDataChange(cellsArray, dataType, changeValue){
    return {
        type: PUT_CHANGE,
        dataType: dataType,
        cells: cellsArray,
        changeValue: changeValue,
    }

}