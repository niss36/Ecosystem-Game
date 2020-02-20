import {AUTOTROPH, OMNIVORE, HERBIVORE, CARNIVORE, GENERAL_ANIMAL} from "../definitions/AnimalTypes";
import {NEXT_TURN, PUT_ANIMAL, PUT_CHANGE} from "../actions";
import {ABUNDANCE_DENSITY, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
        HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS, BIOMASS_DENSITY} from "../definitions/DataTypes";
import {combineReducers} from "redux";
import {SIZE} from "../definitions/Map";

const animals = [AUTOTROPH, OMNIVORE, HERBIVORE, CARNIVORE, GENERAL_ANIMAL];
const dataTypes = [ABUNDANCE_DENSITY, TROPHIC_EVENNESS, REALM, MEAN_TROPHIC_LEVEL, MIN_TROPHIC_INDEX, MAX_TROPHIC_INDEX, MAX_BODYMASS,
    HANPP, FUNCTIONAL_RICHNESS, FRACTION_YEAR_FROST, BIOMASS_RICHNESS, BIOMASS_EVENNESS, BIOMASS_DENSITY];

const size = SIZE;
const initialStores = {
    history : [],
    currentData : {
        //TODO potentiall remove data stores which aren't necessary.
        [ABUNDANCE_DENSITY]:    {[HERBIVORE]: [], [CARNIVORE]: [], [OMNIVORE]: [], [AUTOTROPH]: [], [GENERAL_ANIMAL]: [],},
        [BIOMASS_DENSITY]:      {[HERBIVORE]: [], [CARNIVORE]: [], [OMNIVORE]: [], [AUTOTROPH]: [], [GENERAL_ANIMAL]: [],},
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
    storedChanges: {
        //TODO only store states of areas that need to be changed.
        [ABUNDANCE_DENSITY]:    {[HERBIVORE]: [], [CARNIVORE]: [], [OMNIVORE]: [], [AUTOTROPH]: [], [GENERAL_ANIMAL]: []},
        [BIOMASS_DENSITY]:      {[HERBIVORE]: [], [CARNIVORE]: [], [OMNIVORE]: [], [AUTOTROPH]: [], [GENERAL_ANIMAL]: []},
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
};


export function nextTurnData(state = initialStores, action){
    switch(action.type){
        case NEXT_TURN:
            //TODO Apply changes, store old values and read next values when data is acquired.
            for (let dataType in dataTypes) {
                if (dataType === ABUNDANCE_DENSITY || dataType === BIOMASS_DENSITY) {
                    for (let animal in animals) {
                        for (let change in state.storedChanges[dataType][animal]) {
                            let cells = change.cells;
                            let value = change.value;
                            //TODO do changes
                        }
                    }
                } else {
                    for (let change in state.storedChanges[dataType]) {
                        let cells = change.cells;
                        let value = change.value;
                        //TODO do changes
                    }
                }
            }
            return state; //TODO replace with changed state.
        default:
            return state;
    }
}

export function commitChange(state = initialStores, action){
        switch(action.type){
            //TODO potentially devise a better change storage.
            case PUT_CHANGE:
                return {...state, storedChanges: {...state.storedChanges, [action.dataType]: [...state.storedChanges[action.dataType]].append({cells: action.cells, value: action.changeValue})}};
            case PUT_ANIMAL:
                return {...state, storedChanges: {...state.storedChanges, [action.dataType]: {...state.storedChanges[action.dataType], [action.animalType]: [...state.storedChanges[action.dataType][action.animalType]].append({cells: action.cells, value: action.changeValue})}}};
            default:
                return state;
        }
}

export function stateDataAccess(id){
    //TODO get states from storage.
}

export const data = combineReducers({
        nextTurnData,
        commitChange,
    }
);
