import {
    CELL_MOUSE_CLICK,
    NEXT_TURN,
} from "../actions";
const initialState = {
    display: "none",
    cellNo: 0,
};



export function cellInfo(state = initialState, action) {
    switch (action.type) {
        case CELL_MOUSE_CLICK:{
            if (state.display === "block" && action.i === state.cellNo ){

                return {...state, display: "none", cellNo: action.i};
            }
            return {...state, display: "block", cellNo: action.i};
        }
        default:{
            return state;
        }
    }
}