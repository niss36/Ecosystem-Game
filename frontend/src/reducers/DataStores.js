import {NEXT_TURN, GET_DATA_INITIAL, NEXT_TURN_LOADING, START_GAME} from "../actions";
import {combineReducers} from "redux";

let initialStores = {
    history: [],
    loading: false,
    initial: undefined,
};

export function updateData(state= initialStores, action) {
    console.log(action);
    switch(action.type){
        case NEXT_TURN_LOADING:
            return {...state, loading: true, initial: action.initial};
        case NEXT_TURN:
            if(state.history.length > 0){
                let newHistory = [...state.history];
                newHistory.push(action.data);
                return {history: newHistory, loading: false};
            }
            else {
                return {history: [action.data], loading: false};
            }
        case START_GAME:
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