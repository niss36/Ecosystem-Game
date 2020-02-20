import {HERBIVORE, CARNIVORE} from "../definitions/AnimalTypes";
import {NEXT_TURN, BUY_BUILDING, SELL_BUILDING} from "../actions";
import {ABUNDANCE_DENSITY_CARNIVORE, BIOMASS_DENSITY_CARNIVORE, ABUNDANCE_DENSITY_HERBIVORE, BIOMASS_DENSITY_HERBIVORE, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
    HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS} from "../definitions/DataTypes";
import {combineReducers} from "redux";
import {SIZE} from "../definitions/Map";

const animals = [CARNIVORE, HERBIVORE];
const dataTypes = [ABUNDANCE_DENSITY_CARNIVORE, BIOMASS_DENSITY_CARNIVORE, ABUNDANCE_DENSITY_HERBIVORE, BIOMASS_DENSITY_HERBIVORE, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
    HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS];

const size = SIZE;
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
            case BUY_BUILDING:
                let newLog1 = [...state.storedChanges];
                newLog1.push({buildingType: action.id, changedCells: action.cells, changeValue: action.changeValue});
                return {...state, storedChanges: newLog1};
            case SELL_BUILDING:
                let newLog = [...state.storedChanges];
                let index = 0;
                for(let i = newLog.length - 1; i >= 0; i--){
                    if(index === 0){
                        if (newLog[i].buildingType === action.id){
                            index = i;
                        }
                    }
                }
                newLog = newLog.slice(0, index).concat(newLog.slice(index + 1, newLog.length));
                return {...state, storedChanges: newLog};
            default:
                return state;
        }
}

export const data = combineReducers({
        nextTurnData,
        commitChange,
    }
);
