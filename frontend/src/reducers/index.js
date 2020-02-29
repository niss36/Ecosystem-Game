import {combineReducers} from "redux";

import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {logStorage} from "./LogStorage";
import {cellInfo} from "./CellInfo";
import {Data} from "./DataStores";
import {NEXT_TURN, START_GAME} from "../actions";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../definitions/Resources";
import {LOST, MENU, RUNNING} from "../definitions/GameStatus";

import {getHappiness, getIncome} from "../definitions/Util";
import {graphData} from "./GraphData";

function nextTurnReducer(state, action) {

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
                //TODO: inform player that there is a food deficit, effect happiness based on food deficit amount
                //maybe store the food change per turn in the state somewhere since it is needed for the happiness
                //calculation and potentially the population growth calculation.
            }

            nextResources[id] = {...nextResources[id], amount: nextAmount};
        }

        //Population growth
        //TODO: calculate population growth as a function of food growth and/or other factors?
        nextResources[POPULATION] = {...nextResources[POPULATION], amount: state.resources[POPULATION].amount + 1};

        if (happiness > 0) {
            return {...state, resources: nextResources};
        } else {
            console.log("You lose"); // TODO you lose...
            return {...state, resource: nextResources, gameStatus: LOST};
        }
    }

    return state;
}

function halfDataset(state) {

    const newModValue = state.graphData.modValue * 2;
    const newDataPoints = state.graphData.dataPoints.filter(
        function (el) {
            return (el.timestamp % newModValue === 0)
        }
    );

    const newGraphData = {...state.graphData,
        dataPoints: newDataPoints,
        modValue: newModValue,
    };
    return {...state, graphData: newGraphData};
}

function graphDataReducer(state, action) {

    if(action.type === START_GAME){
        let totalBiomass = action.data.state.herbivoreBiomasses.reduce((total, n) => {return total + n}) + action.data.state.carnivoreBiomasses.reduce((total, n) => {return total + n});
        totalBiomass = totalBiomass/(action.data.state.herbivoreBiomasses.length * 2);
        let abundance = action.data.state.herbivoreAbundances.reduce((total, n) => {return total + n}) + action.data.state.carnivoreAbundances.reduce((total, n) => {return total + n});
        abundance = abundance/(action.data.state.herbivoreAbundances.length * 2);
        const nextGraphData = {...state.graphData,
            dataPoints: [{
                timestamp: 0,
                [POPULATION]: state.resources[POPULATION].amount,
                [HAPPINESS]: state.resources[HAPPINESS].amount,
                [MONEY]: state.resources[MONEY].amount,
                [FOOD]: state.resources[FOOD].amount,
                [WOOD]: state.resources[WOOD].amount,
                meanHarvestedBiomass: action.data.meanHarvestedBiomass,
                totalBiomass: totalBiomass,
                abundance: abundance,
            }]
        };
        return {...state, graphData: nextGraphData};
    }

    if (!state.graphData.dataPoints.length) {
        const nextGraphData = {...state.graphData,
            dataPoints: [{
                timestamp: 0,
                [POPULATION]: state.resources[POPULATION].amount,
                [HAPPINESS]: state.resources[HAPPINESS].amount,
                [MONEY]: state.resources[MONEY].amount,
                [FOOD]: state.resources[FOOD].amount,
                [WOOD]: state.resources[WOOD].amount,
            }]
        };

        return {...state, graphData: nextGraphData};
    }

    if (action.type === NEXT_TURN) {
        //check dataset isn't too large, if so half it
        if (state.graphData.dataPoints.length === 30) {
            state = halfDataset(state);
        }

        const nextTimestamp = state.graphData.currentTimestamp + 1;
        if (nextTimestamp % state.graphData.modValue === 0) {
            let totalBiomass = action.data.state.herbivoreBiomasses.reduce((total, n) => {return total + n}) + action.data.state.carnivoreBiomasses.reduce((total, n) => {return total + n});
            totalBiomass = totalBiomass/(action.data.state.herbivoreBiomasses.length * 2);
            let abundance = action.data.state.herbivoreAbundances.reduce((total, n) => {return total + n}) + action.data.state.carnivoreAbundances.reduce((total, n) => {return total + n});
            abundance = abundance/(action.data.state.herbivoreAbundances.length * 2);
            const nextGraphData = {
                ...state.graphData,
                dataPoints: [...state.graphData.dataPoints, {
                    timestamp: nextTimestamp,
                    [POPULATION]: state.resources[POPULATION].amount,
                    [HAPPINESS]: state.resources[HAPPINESS].amount,
                    [MONEY]: state.resources[MONEY].amount,
                    [FOOD]: state.resources[FOOD].amount,
                    [WOOD]: state.resources[WOOD].amount,
                    meanHarvestedBiomass: action.data.meanHarvestedBiomass,
                    totalBiomass: totalBiomass,
                    abundance: abundance
                }],
                currentTimestamp: nextTimestamp,
            };

            return {...state, graphData: nextGraphData};
        }
        else {
            const nextGraphData = {...state.graphData, currentTimestamp: nextTimestamp};
            return {...state, graphData: nextGraphData};
        }
    }

    return state;
}

function gameStatus(state = MENU, action) {
    if (action.type === START_GAME) {
        return RUNNING;
    } else if (action.type === "QUIT") { // TODO
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

const mainReducer = combineReducers({
    buildings,
    resources,
    map,
    logStorage,
    graphData,
    Data,
    cellInfo,
    gameStatus,
    guid,
    timestamp,
});

export default function(state = {}, action) {
    state = mainReducer(state, action);
    state = nextTurnReducer(state, action);
    state = graphDataReducer(state, action);

    return state;
}

/**
 * Structure of the state:
 * {
 *     buildings: {
 *         [<building>]: {
 *             numberBuilt: number,
 *             effects: {
 *                 [POPULATION]: {max: number},
 *                 [<resource>]: {income: number},
 *             },
 *         },
 *     },
 *     resources: {
 *         [<resource>]: {amount: number},
 *         taxes: number,
 *         rationing: number,
 *     },
 *     map: {
 *         selection: {
 *             mode: string,
 *             building: string,
 *             cells: [number],
 *         },
 *         cellTypes: [string],
 *         cells: [
 *             {
 *                 type: string,
 *                 size: number,
 *                 effort: number,
 *             }
 *         ],
 *         builtThisTurn: Set(number),
 *         sameCellTypes: [
 *             {
 *                 top: bool,
 *                 right: bool,
 *                 bottom: bool,
 *                 left: bool,
 *             }
 *         ],
 *         logSelection: {
 *             building: string,
 *             cells: [number]
 *         },
 *     },
 *     data: {
 *         ??
 *     },
 *     graphData: {
 *         dataPoints: [
 *             {
 *                 timestamp: number,
 *                 [<resource>]: number,
 *             },
 *        ],
 *        currentTimestamp: number,
 *        modValue: number,
 *     },
 *     cellInfo: {
 *         display: string,
 *         cellNo: number,
 *     },
 *     gameStatus: string,
 *     guid: string,
 *     timestamp: number,
 * }
 */