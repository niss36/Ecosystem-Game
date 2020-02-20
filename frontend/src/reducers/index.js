import {buildings} from "./Decisions";
import {resources} from "./Resources";
import {map} from "./Map";
import {data} from "./DataAccess";

export default function(state = {}, action) {
    return {
        buildings: buildings(state.buildings, action),
        resources: resources(state.resources, action, state.buildings),
        data:      data(state.data, action),
        map: map(state.map, action),
    }
}