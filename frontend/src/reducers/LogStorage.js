import {
    NEXT_TURN,
    END_BUY_BUILDING,
    END_REMOVE_BUILDING,
    LOG_ITEM_SELECT,
    LOG_CHANGE_DISPLAYED,
} from "../actions";
import {combineReducers} from "redux";
import buildDict from '../definitions/Buildings';
let buildings = Object.keys(buildDict);
const initialClean = newCleanHistoryMaker();

const initialStores = {
    selectedLogIndex: {index: "undefined", selectedDel: []},
    displayedTurn: 0,
    currentTurn: 0,
    historyClean: [initialClean],
    displayedCleanLog: initialClean,
    selectedLogItem: {building: undefined, action: ''},
};

function newCleanHistoryMaker(){
    let dict = {buy: {}, sell: {}};
    for(let i = 0; i < buildings.length; i++){
        let building = buildings[i];
        dict = {...dict, buy: {...dict.buy, [building]: []}, sell: {...dict.sell, [building]: []}};
    }
    return dict;
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
                    let newHistoryClean = [...state.historyClean];
                    let buyHistory = [...newHistoryClean[state.currentTurn].buy[action.id]];
                    for(let i = 0; i < action.selectedCells.length; i++) {
                        let cell = action.selectedCells[i];
                            buyHistory.push(cell);
                    }
                    newHistoryClean[state.currentTurn] = {...newHistoryClean[state.currentTurn], buy: {...newHistoryClean[state.currentTurn].buy, [action.id]: buyHistory}};
                    return {...state, historyClean: newHistoryClean};
                }
                else{
                    return state;
                }
            case END_REMOVE_BUILDING:
                if(action.selectedCells.length !== 0) {
                    let newHistoryClean = [...state.historyClean];
                    let buyHistory = [...newHistoryClean[state.currentTurn].buy[action.id]];
                    let sellHistory = [...newHistoryClean[state.currentTurn].sell[action.id]];
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
                    newHistoryClean[state.currentTurn] = {...newHistoryClean[state.currentTurn], buy: {...newHistoryClean[state.currentTurn].buy, [action.id]: buyHistory}, sell: {...newHistoryClean[state.currentTurn].sell, [action.id]: sellHistory}};
                    return {...state, historyClean: newHistoryClean};
                }
                else{
                    return state;
                }
            case NEXT_TURN:
                let newCleanHistory = [];
                if(state.historyClean.length !== 0){
                    newCleanHistory = [...state.historyClean];
                }
                newCleanHistory.push(newCleanHistoryMaker());
                return {...state,currentTurn: state.currentTurn + 1, displayedTurn: state.currentTurn + 1, selectedLogIndex: {index: "undefined", selectedDel: []}, historyClean: newCleanHistory};
            case LOG_CHANGE_DISPLAYED:
                let newIndex = action.index;
                return {...state, displayedTurn: newIndex, selectedLogIndex: {index: "undefined", selectedDel: []}, displayedCleanLog: state.historyClean[newIndex], selectedLogItem: {building: undefined, action: ''}};
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
