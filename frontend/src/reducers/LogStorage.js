import {
    NEXT_TURN,
    END_BUY_BUILDING,
    END_REMOVE_BUILDING,
    LOG_ITEM_SELECT,
    LOG_ITEM_CONFIRM,
    LOG_CHANGE_DISPLAYED
} from "../actions";
import {combineReducers} from "redux";
import{ANIMAL_FARM, CHEAP_LUMBER_MILL, EXPENSIVE_LUMBER_MILL, FISHING_BOAT, HUNTING_SHACK, SETTLEMENT} from "../definitions/Buildings";
const initialClean = newCleanHistoryMaker();

const initialStores = {
    history : [[]],
    selectedLogIndex: {index: "undefined", selectedDel: []},
    displayedLog: [],
    displayedTurn: 0,
    currentTurn: 0,
    historyClean: [initialClean],
    displayedCleanLog: initialClean,
    selectedLogItem: {building: undefined, action: ''},
};

function newCleanHistoryMaker(){
    return {
        buy:  {
            [ANIMAL_FARM]: [],
            [CHEAP_LUMBER_MILL]: [],
            [EXPENSIVE_LUMBER_MILL]: [],
            [FISHING_BOAT]: [],
            [HUNTING_SHACK]: [],
            [SETTLEMENT]: [],
        },
        sell: {
            [ANIMAL_FARM]: [],
            [CHEAP_LUMBER_MILL]: [],
            [EXPENSIVE_LUMBER_MILL]: [],
            [FISHING_BOAT]: [],
            [HUNTING_SHACK]: [],
            [SETTLEMENT]: [],
        },
    }
}

function contains(array, item){
    for(let i = 0; i < array.length; i++){
        if(array[i] === item){
            return i;
        }
    }
    return -1;
}

function removeIndex(array, index){
    array.splice(index, 1);
}

export function commitChange(state = initialStores, action){
        switch(action.type){
            case END_BUY_BUILDING:
                if(action.selectedCells.length !== 0) {
                    console.log(state.displayedCleanLog);
                    let newHistory = [...state.history];
                    newHistory[state.currentTurn].push({
                        buildingType: action.id,
                        selectedCells: action.selectedCells,
                        changeValue: action.changeValue,
                        actionType: 'Buy'
                    });
                    let newDisplayed = [];
                    if (state.displayedLog.length !== 0 || state.displayedLog.length !== undefined) {
                        newDisplayed = [...state.displayedLog];
                    }
                    if (state.currentTurn === state.currentTurn) {
                        newDisplayed.push({
                            buildingType: action.id,
                            selectedCells: action.selectedCells,
                            changeValue: action.changeValue,
                            actionType: 'Buy'
                        });
                    }
                    let newHistoryClean = [...state.historyClean];
                    let buyHistory = newHistoryClean[state.currentTurn].buy[action.id];
                    let sellHistory = newHistoryClean[state.currentTurn].sell[action.id];
                    for(let i = 0; i < action.selectedCells.length; i++) {
                        let cell = action.selectedCells[i];
                        /*let index = contains(sellHistory, cell);
                        if(index !== -1){
                            removeIndex(sellHistory, index);
                        }
                        else{*/
                            buyHistory.push(cell);
                        //}
                    }
                    return {...state, history: newHistory, displayedLog: newDisplayed, historyClean: newHistoryClean};
                }
                else{
                    return state;
                }
            case END_REMOVE_BUILDING:
                if(action.selectedCells.length !== 0) {
                    let newHistory2 = [...state.history];
                    newHistory2[state.currentTurn].push({
                        buildingType: action.id,
                        selectedCells: action.selectedCells,
                        changeValue: action.changeValue,
                        actionType: 'Sell'
                    });
                    let newDisplayed2 = [];
                    if (state.displayedLog.length !== 0 || state.displayedLog.length !== undefined) {
                        newDisplayed2 = [...state.displayedLog];
                    }
                    if (state.currentTurn === state.currentTurn) {
                        newDisplayed2.push({
                            buildingType: action.id,
                            selectedCells: action.selectedCells,
                            changeValue: action.changeValue,
                            actionType: 'Sell'
                        });
                    }
                    let newHistoryClean = [...state.historyClean];
                    let buyHistory = newHistoryClean[state.currentTurn].buy[action.id];
                    let sellHistory = newHistoryClean[state.currentTurn].sell[action.id];
                    for(let i = 0; i < action.selectedCells.length; i++) {
                        let cell = action.selectedCells[i];
                        let index = contains(buyHistory, cell);
                        if(index !== -1){
                            removeIndex(buyHistory, index);
                        }
                        else{
                            sellHistory.push(cell);
                        }
                    }
                    return {...state, history: newHistory2, displayedLog: newDisplayed2, historyClean: newHistoryClean};
                }
                else{
                    return state;
                }
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
                let newHistory3 = [];
                if(state.history.length !== 0){
                    newHistory3 = [...state.history];
                }
                newHistory3.push([]);
                let newCleanHistory = [];
                if(state.historyClean.length !== 0){
                    newCleanHistory = [...state.historyClean];
                }
                newCleanHistory.push(newCleanHistoryMaker());
                return {...state, history: newHistory3 ,currentTurn: state.currentTurn + 1, displayedTurn: state.currentTurn + 1, selectedLogIndex: {index: "undefined", selectedDel: []}, historyClean: newCleanHistory};
            case LOG_CHANGE_DISPLAYED:
                let newIndex = action.index;
                return {...state, displayedTurn: newIndex, selectedLogIndex: {index: "undefined", selectedDel: []}, displayedLog: [...state.history[newIndex]], displayedCleanLog: state.historyClean[newIndex], selectedLogItem: {building: undefined, action: ''}};
            case LOG_ITEM_SELECT:
                let newDisplayedLog = {building: action.buildingType, action: action.actionType};
                if(state.selectedLogItem.building === action.buildingType && state.selectedLogItem.action === action.actionType){
                    return {...state, selectedLogItem: {building: undefined, action: ''}};
                }
                else {
                    return {...state, selectedLogItem: newDisplayedLog};
                }
            default:
                return state;
        }
}

export const logStorage = combineReducers({
        commitChange,
    }
);
