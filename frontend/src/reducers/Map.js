import {CELL_MOUSE_ENTER, CELL_MOUSE_CLICK} from "../actions";

import {getSelection} from "../definitions/Util";

export function map(state={selection: {mode: true, cells: []}}, action) {
    switch (action.type) {
        case CELL_MOUSE_ENTER:
            if (state.selection.mode) {
                const selectedCells = getSelection(action.i);
                return {...state, selection: {...state.selection, cells: selectedCells}};
            }
            return state;
        case CELL_MOUSE_CLICK:
            return state; // TODO
        default:
            return state;
    }
}