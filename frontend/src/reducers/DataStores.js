import {NEXT_TURN, GET_DATA_INITIAL, NEXT_TURN_LOADING} from "../actions";
import {combineReducers} from "redux";

let initialStores = {
    history: [],
    loading: false,
};

export function updateData(state= initialStores, action) {
    switch(action.type){
        case NEXT_TURN_LOADING:
            return {...state, loading: true};
        case NEXT_TURN:
            if(state.history.length > 0){
                let newHistory = [...state.history];
                newHistory.push(action.data);
                return {history: newHistory, loading: false};
            }
            else {
                return {history: [action.data], loading: false};
            }
        case GET_DATA_INITIAL:
            if(state.history.length > 0) {
                let newHistory = [...state.history];
                newHistory.push(action.data);
                return {history: newHistory, loading: false};
            }
            else {
                return {history: [action.data], loading: false};
            }
        default:
            return state;
    }
}

export const Data = combineReducers({
        updateData,
    }
);