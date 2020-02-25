import {
    NEXT_TURN,
    END_BUY_BUILDING,
    END_REMOVE_BUILDING,
    LOG_ITEM_SELECT,
    LOG_ITEM_CONFIRM,
    LOG_CHANGE_DISPLAYED
} from "../actions";
import {combineReducers} from "redux";


const initialStores = {
    history : [[]],
    selectedLogIndex: {index: "undefined", selectedDel: []},
    displayedLog: [],
    displayedTurn: 0,
    currentTurn: 0,
};

export function commitChange(state = initialStores, action){
        switch(action.type){
            case END_BUY_BUILDING:
                /*
                let newLog1 = [...state.history];
                newLog1[state.currentTurn].push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Buy'});
                let newDisplayed = [];
                if(state.displayedLog.length !== 0) {
                    newDisplayed = [...state.displayedLog];
                }
                if(state.displayedLog === state.currentTurn){
                    newDisplayed.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Buy'});
                }
                return {...state, history: newLog1, displayedLog: newDisplayed};
                */

                console.log(action);
                let newHistory = [...state.history];
                newHistory[state.currentTurn].push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Buy'});
                let newDisplayed = [];
                if(state.displayedLog.length !== 0 || state.displayedLog.length !== undefined){
                    newDisplayed = [...state.displayedLog];
                }
                if(state.currentTurn === state.currentTurn){
                    newDisplayed.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Buy'});
                }
                return {...state, history: newHistory, displayedLog: newDisplayed};
            case END_REMOVE_BUILDING:

                /*
                let newLog = [...state.history];
                newLog[state.currentTurn].push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Sell'});
                let newDisplayed2 = [];
                if(state.displayedLog.length !== 0) {
                    newDisplayed2 = [...state.displayedLog];
                }
                if(state.displayedLog === state.currentTurn){
                    newDisplayed2.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Sell'});
                }
                return {...state, history: newLog, displayedLog: newDisplayed2};
                */

                console.log(action);
                let newHistory2 = [...state.history];
                newHistory2[state.currentTurn].push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Sell'});
                let newDisplayed2 = [];
                if(state.displayedLog.length !== 0 || state.displayedLog.length !== undefined){
                    newDisplayed2 = [...state.displayedLog];
                }
                if(state.currentTurn === state.currentTurn){
                    newDisplayed2.push({buildingType: action.id, selectedCells: action.selectedCells, changeValue: action.changeValue, actionType: 'Sell'});
                }
                return {...state, history: newHistory2, displayedLog: newDisplayed2};
            /*case LOG_ITEM_SELECT:

                let selectedDel = [];
                for(let i = action.index; i < state.history[state.currentTurn].length; i++){
                    selectedDel.push({buildingType: state.history[state.currentTurn][i].buildingType, actionType: state.history[state.currentTurn][i].actionType, selectedCells: state.history[state.currentTurn][i].selectedCells})
                }
                return {...state, selectedLogIndex: {index: action.index, selectedDel: selectedDel}};



                if(state.currentTurn === state.displayedTurn) {
                    let selectedDel = [];
                    for (let i = action.index; i < state.history[state.currentTurn].length; i++){
                        selectedDel.push({buildingType: state.history[state.currentTurn][i].buildingType, actionType: state.history[state.currentTurn][i].actionType, selectedCells: state.history[state.currentTurn][i].selectedCells})
                    }
                    return {...state, selectedLogIndex: {index: action.index, selectedDel: selectedDel}};
                }
                else{
                    return state;
                }
            case LOG_ITEM_CONFIRM:

                let newChanges = [...state.history];
                for(let i = action.index; i < state.history[state.currentTurn].length; i++){
                    newChanges[state.currentTurn].pop();
                }
                return {...state, history: newChanges, selectedLogIndex: {index: "undefined", selectedDel: []}};
            */
            case NEXT_TURN:
                /*
                let newHistory = [];
                if(state.history.length !== 0) {
                    newHistory = [...state.history].push([]);
                }
                return {...state, currentTurn: (state.currentTurn + 1), history: newHistory, selectedLogIndex: {index: "undefined", selectedDel: []}};
                */

                let newHistory3 = [];
                if(state.history.length !== 0){
                    newHistory3 = [...state.history];
                }
                newHistory3.push([]);
                return {...state, history: newHistory3 ,currentTurn: state.currentTurn + 1, displayedTurn: state.currentTurn + 1, selectedLogIndex: {index: "undefined", selectedDel: []}};
            case LOG_CHANGE_DISPLAYED:
                /*
                let newIndex = action.index;
                return {...state, displayedTurn: newIndex, selectedLogIndex: {index: "undefined", selectedDel: []}, displayedLog: {...state.history[newIndex]}};
                */
                let newIndex = action.index;
                return {...state, displayedTurn: newIndex, selectedLogIndex: {index: "undefined", selectedDel: []}, displayedLog: [...state.history[newIndex]]};
            default:
                return state;
        }
}

export const logStorage = combineReducers({
        commitChange,
    }
);
