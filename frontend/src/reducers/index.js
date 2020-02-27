import {combineReducers} from "redux";

import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {logStorage} from "./LogStorage";
import {cellinfo} from "./CellInfo";
import {Data} from "./DataStores";
import {NEXT_TURN, START_GAME} from "../actions";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../definitions/Resources";
import {LOST, MENU, RUNNING} from "../definitions/GameStatus";

import {getHappiness, getIncome} from "../definitions/Util";

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

function graphDataReducer(state, action) {

    if (!state.graphData.length) {
        const nextGraphData = [{
            timestamp: 0,
            [POPULATION]: state.resources[POPULATION].amount,
            [HAPPINESS]: state.resources[HAPPINESS].amount,
            [MONEY]: state.resources[MONEY].amount,
            [FOOD]: state.resources[FOOD].amount,
            [WOOD]: state.resources[WOOD].amount,
        }];

        return {...state, graphData: nextGraphData};
    }

    if (action.type === NEXT_TURN) {
        const nextTimestamp = state.graphData[state.graphData.length-1].timestamp + 1;
        const nextGraphData = [...state.graphData, {
            timestamp: nextTimestamp,
            [POPULATION]: state.resources[POPULATION].amount,
            [HAPPINESS]: state.resources[HAPPINESS].amount,
            [MONEY]: state.resources[MONEY].amount,
            [FOOD]: state.resources[FOOD].amount,
            [WOOD]: state.resources[WOOD].amount,
        }];

        return {...state, graphData: nextGraphData};
    }

    return state;
}

function graphData(state = [], action) {
    return state;
}

function gameStatus(state = RUNNING, action) {
    if (action.type === START_GAME) {
        return RUNNING;
    } else if (action.type === "QUIT") { // TODO
        return MENU;
    }

    return state;
}

const mainReducer = combineReducers({
    buildings,
    resources,
    map,
    logStorage,
    graphData,
    Data,
    cellinfo,
    gameStatus,
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
 *         island: [number],
 *         cells: [string],
 *     },
 *     data: {
 *         ??
 *     },
 *     graphData: [
 *         {
 *             timestamp: number,
 *             [<resource>]: number,
 *         },
 *     ]
 * }
 */