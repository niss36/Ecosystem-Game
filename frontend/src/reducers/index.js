import {combineReducers} from "redux";

import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {logStorage} from "./LogStorage";
import {cellInfo} from "./CellInfo";
import {graphData} from "./GraphData";

import {NEXT_TURN, NEXT_TURN_LOADING, QUIT_GAME, START_GAME} from "../actions";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../definitions/Resources";
import {LOST, MENU, RUNNING} from "../definitions/GameStatus";

import {getHappiness, getIncome, normalize} from "../definitions/Util";

function nextTurnReducer(state, action) {
    console.log(state.map.data);

    if (action.type === NEXT_TURN) {

        const nextResources = {...state.resources};

        //Happiness calculation:
        const happiness = getHappiness(state).amount;
        nextResources[HAPPINESS] = {...nextResources[HAPPINESS], amount: happiness};

        //Basic resources increase
        for (const id of [MONEY, FOOD, WOOD]) {
            const income = getIncome(id, state).total;
            let nextAmount = nextResources[id].amount + income;
            if (id === FOOD && nextAmount < 0) {
                nextAmount = 0;
            }

            nextResources[id] = {...nextResources[id], amount: nextAmount};
        }

        //Population growth
        const currentPopulation = state.resources[POPULATION].amount;
        const growth = Math.floor(currentPopulation/30) + 1;
        nextResources[POPULATION] = {...nextResources[POPULATION], amount: state.resources[POPULATION].amount + growth};

        if (happiness > 0) {
            return {...state, resources: nextResources};
        } else {
            return {...state, resources: nextResources, gameStatus: LOST};
        }
    }

    return state;
}

function halfDataset(state) {

    const newModValue = state.graphData.modValue * 2;
    const newDataPoints = state.graphData.dataPoints.filter(el => (el.timestamp % newModValue === 0));

    const newGraphData = {...state.graphData,
        dataPoints: newDataPoints,
        modValue: newModValue,
    };
    return {...state, graphData: newGraphData};
}

function sum(array) {
    return array.reduce((t, n) => t + n, 0);
}

function sumBiomass(action) {
    return sum(action.data.state.herbivoreBiomasses) + sum(action.data.state.carnivoreBiomasses);
}

function sumHarvestedBiomass(action) {
    return sum(action.data.harvestedBiomasses);
}

function graphDataReducer(state, action) {

    if(action.type === START_GAME) {
        const totalBiomass = normalize(sumBiomass(action));
        const totalHarvestedBiomass = normalize(sumHarvestedBiomass(action));
        const nextGraphData = {...state.graphData,
            dataPoints: [{
                timestamp: 0,
                [POPULATION]: state.resources[POPULATION].amount,
                [HAPPINESS]: state.resources[HAPPINESS].amount,
                [MONEY]: state.resources[MONEY].amount,
                [FOOD]: state.resources[FOOD].amount,
                [WOOD]: state.resources[WOOD].amount,
                totalHarvestedBiomass: totalHarvestedBiomass,
                totalBiomass: totalBiomass,
            }]
        };
        return {...state, graphData: nextGraphData};
    }

    if (action.type === NEXT_TURN) {
        //check dataset isn't too large, if so half it
        if (state.graphData.dataPoints.length === 40) {
            state = halfDataset(state);
        }

        const nextTimestamp = state.graphData.currentTimestamp + 1;
        if (nextTimestamp % state.graphData.modValue === 0) {
            const totalBiomass = normalize(sumBiomass(action));
            const totalHarvestedBiomass = normalize(sumHarvestedBiomass(action));
            const nextGraphData = {
                ...state.graphData,
                dataPoints: [...state.graphData.dataPoints, {
                    timestamp: nextTimestamp,
                    [POPULATION]: state.resources[POPULATION].amount,
                    [HAPPINESS]: state.resources[HAPPINESS].amount,
                    [MONEY]: state.resources[MONEY].amount,
                    [FOOD]: state.resources[FOOD].amount,
                    [WOOD]: state.resources[WOOD].amount,
                    totalHarvestedBiomass: totalHarvestedBiomass,
                    totalBiomass: totalBiomass,
                }],
                currentTimestamp: nextTimestamp,
            };

            return {...state, graphData: nextGraphData};
        } else {
            const nextGraphData = {...state.graphData, currentTimestamp: nextTimestamp};
            return {...state, graphData: nextGraphData};
        }
    }

    return state;
}

function gameStatus(state = MENU, action) {
    if (action.type === START_GAME) {
        return RUNNING;
    } else if (action.type === QUIT_GAME) {
        return MENU;
    }

    return state;
}

function guid(state = null, action) {
    if (action.type === START_GAME)
        return action.guid;

    return state;
}

function timestamp(state = 0, action) {
    if (action.type === START_GAME)
        return 0;
    else if (action.type === NEXT_TURN)
        return state + 1;

    return state;
}

function modelData(state = {}, action) {
    if (action.type === START_GAME || action.type === NEXT_TURN) {
        return action.data;
    }

    return state;
}

function loading(state = false, action) {
    switch(action.type){
        case NEXT_TURN_LOADING:
            return true;
        case START_GAME:
        case NEXT_TURN:
            return false;
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    buildings,
    resources,
    map,
    logStorage,
    graphData,
    cellInfo,
    gameStatus,
    guid,
    timestamp,
    modelData,
    loading,
});

export default function(state = {}, action) {
    if (action.type === START_GAME) {
        state = {};
    }
    state = mainReducer(state, action);
    state = nextTurnReducer(state, action);
    state = graphDataReducer(state, action);

    return state;
}