export const BUY_BUILDING = "BUY_BUILDING";
export const SELL_BUILDING = "SELL_BUILDING";
export const SET_EFFORT = "SET_EFFORT";
export const NEXT_TURN = "NEXT_TURN";

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