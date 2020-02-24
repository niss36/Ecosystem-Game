import {NEXT_TURN, END_BUY_BUILDING, END_REMOVE_BUILDING,  LOG_ITEM_SELECT, LOG_ITEM_CONFIRM} from "../actions";
import {combineReducers} from "redux";


const initialStores = {
    history : [],
    storedChanges: [],
    selectedLogIndex: {index: "undefined", selectedDel: []}
};

export function commitChange(state = initialStores, action){
        switch(action.type){
            case END_BUY_BUILDING:// THIS MIGHT BE WRONG TODO THIS IS PROB WRONG AND THE START REMOVE BUILDING
                let newLog1 = [...state.storedChanges];
                newLog1.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Buy'});
                return {...state, storedChanges: newLog1};
            case END_REMOVE_BUILDING:
                let newLog = [...state.storedChanges];
                newLog.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Sell'});
                return {...state, storedChanges: newLog};
            case LOG_ITEM_SELECT:
                let selectedDel = [];
                for(let i = action.index; i < state.storedChanges.length; i++){
                    selectedDel.push({buildingType: state.storedChanges[i].buildingType, actionType: state.storedChanges[i].actionType, selectedCells: state.storedChanges[i].selectedCells})
                }
                return {...state, selectedLogIndex: {index: action.index, selectedDel: selectedDel}};
            case LOG_ITEM_CONFIRM:
                let newChanges = [...state.storedChanges];
                for(let i = action.index; i < state.storedChanges.length; i++){
                    newChanges.pop();
                }
                return {...state, storedChanges: newChanges, selectedLogIndex: {index: "undefined", selectedDel: []}};
            case NEXT_TURN:
                let newHistory = [];
                if(state.history.length !== 0) {
                    newHistory = [...state.history].push({...state.storedChanges});
                }
                return {...state, history: newHistory, storedChanges: [], selectedLogIndex: {index: "undefined", selectedDel: []}};
            default:
                return state;
        }
}

export const logStorage = combineReducers({
        commitChange,
    }
);
