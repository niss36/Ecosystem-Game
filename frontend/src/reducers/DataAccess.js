// import {HERBIVORE, CARNIVORE} from "../definitions/AnimalTypes";
import {NEXT_TURN, END_BUY_BUILDING, END_REMOVE_BUILDING,  LOG_ITEM_SELECT, LOG_ITEM_CONFIRM} from "../actions";
import {ABUNDANCE_DENSITY_CARNIVORE, BIOMASS_DENSITY_CARNIVORE, ABUNDANCE_DENSITY_HERBIVORE, BIOMASS_DENSITY_HERBIVORE, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
    HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS} from "../definitions/DataTypes";
import {combineReducers} from "redux";
import {SIZE} from "../definitions/Map";

// const animals = [CARNIVORE, HERBIVORE];
const dataTypes = [ABUNDANCE_DENSITY_CARNIVORE, BIOMASS_DENSITY_CARNIVORE, ABUNDANCE_DENSITY_HERBIVORE, BIOMASS_DENSITY_HERBIVORE, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
    HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS];

const initialStores = {
    history : [],
    currentData : {
        //TODO potentially remove data stores which aren't necessary.
        [ABUNDANCE_DENSITY_CARNIVORE]:    [],
        [BIOMASS_DENSITY_CARNIVORE]:      [],
        [ABUNDANCE_DENSITY_HERBIVORE]:    [],
        [BIOMASS_DENSITY_HERBIVORE]:      [],
        [TROPHIC_EVENNESS]:     [],
        [REALM]:                [],
        [MEAN_TROPHIC_LEVEL]:   [],
        [MIN_TROPHIC_INDEX]:    [],
        [MAX_TROPHIC_INDEX]:    [],
        [MAX_BODYMASS]:         [],
        [HANPP]:                [],
        [FUNCTIONAL_RICHNESS]:  [],
        [FRACTION_YEAR_FROST]:  [],
        [BIOMASS_RICHNESS]:     [],
        [BIOMASS_EVENNESS]:     [],
    },
    storedChanges: [],
    selectedLogIndex: {index: "undefined", selectedDel: []}
};


export function nextTurnData(state = initialStores, action){
    switch(action.type){
        case NEXT_TURN:
            //TODO Apply changes, store old values and read next values when data is acquired.
            for (let dataType in dataTypes) {
                for (let change in state.storedChanges[dataType]) {
                    let cells = change.cells;
                    let value = change.changeValue;
                }
            }
            return state;
        default:

            return state;
    }
}

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
            default:
                return state;
        }
}

export const data = combineReducers({
        nextTurnData,
        commitChange,
    }
);
