import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {data} from "./DataAccess";
import {NEXT_TURN} from "../actions";
import {combineReducers} from "redux";
import {getIncome} from "../definitions/Util";
import {MONEY, FOOD, WOOD} from "../definitions/Resources";

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

const mainReducer = combineReducers({
    buildings,
    resources,
    map,
    data,
});

export default function(state = {}, action) {
    state = mainReducer(state, action);
    state = nextTurnReducer(state, action);

    return state;
}