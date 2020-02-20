import React from "react";

import "./Cell.css";
import {FISHING_BOAT, HUNTING_SHACK} from "../../definitions/Buildings";

export default class Cell extends React.Component {

    render() {
        const {i, land, mode, selected, onMouseEnter, onMouseClick,celldata,addOrRemove} = this.props;

        let classes = "Cell-root";
        if (land) {
            classes += " land";
        }
        if (addOrRemove === "remove" && selected && mode === celldata) {
            classes += " remove"
        } else if (addOrRemove === "remove" && selected) {
            // do nothing
        } else  if (celldata === FISHING_BOAT){
            classes += " "+FISHING_BOAT
        }
        else if (celldata === HUNTING_SHACK){
            classes += " "+HUNTING_SHACK
        }
        else if (selected) {
            classes += " " + mode;
        }



        return (
            <p className={classes} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                {i}
            </p>
        );
    }
}