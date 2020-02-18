import {buildings} from "./Decisions";
import {resources} from "./Resources";

export default function(state = {}, action) {
    return {
        buildings: buildings(state.buildings, action),
        resources: resources(state.resources, action, state.buildings)
    }
}