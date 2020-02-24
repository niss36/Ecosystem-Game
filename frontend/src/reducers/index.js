import {combineReducers} from "redux";

import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {data} from "./LogStorage";

import {NEXT_TURN} from "../actions";

import {POPULATION, HAPPINESS, MONEY, FOOD, WOOD} from "../definitions/Resources";

import {getIncome} from "../definitions/Util";

function nextTurnReducer(state, action) {

    if (action.type === NEXT_TURN) {

        const nextResources = {...state.resources};

        for (const id of [MONEY, FOOD, WOOD]) {
            const income = getIncome(id, state).total;
            const nextAmount = nextResources[id].amount + income;

            nextResources[id] = {...nextResources[id], amount: nextAmount};
        }

        return {...state, resources: nextResources};
    }

    return state;
}

function graphDataReducer(state, action) {

    if (!state.graphData.length) {
        const nextGraphData = [{
            timestamp: 0,
            pop: state.resources[POPULATION].amount,
            happiness: state.resources[HAPPINESS],
            money: state.resources[MONEY].amount,
            food: state.resources[FOOD].amount,
            wood: state.resources[WOOD].amount,
        }];

        return {...state, graphData: nextGraphData};
    }

    if (action.type === NEXT_TURN) {
        const nextTimestamp = state.graphData[state.graphData.length-1].timestamp + 1;
        const nextGraphData = [...state.graphData, {
            timestamp: nextTimestamp,
            pop: state.resources[POPULATION].amount,
            happiness: state.resources[HAPPINESS],
            money: state.resources[MONEY].amount,
            food: state.resources[FOOD].amount,
            wood: state.resources[WOOD].amount,
        }];

        return {...state, graphData:nextGraphData};
    }

    return state;
}

function graphData(state = [], action) {
    return state;
}

const mainReducer = combineReducers({
    buildings,
    resources,
    map,
    data,
    graphData,
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