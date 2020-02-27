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
        case NEXT_TURN: {
            return {...state, display: "none"};
        }
        case CELL_MOUSE_CLICK:{
            return {...state, display: "block", cellNo: action.i};
        }
        default:{
            return state;
        }
    }
}