import React from "react";
import PropTypes from "prop-types";

import "./Cell.css";
import {FOREST, LAND, SEA} from "../../definitions/Map";

class Cell extends React.Component {

    render() {
        const {i, landType, mode, building, selected, cellData, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (landType === LAND) {
            classes += " land";
        }
        else if(landType === FOREST){
            classes += " forest";
        }
        else if (landType === SEA){
            classes += " sea";
        }

        if (selected) {
            if (mode === "remove") {
                classes += " remove";
            } else {
                classes += " " + building;
            }
        }

        if (cellData) {
            classes += " " + cellData;
        }

        return (
            <p className={classes} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                {i}
            </p>
        );
    }
}

Cell.propTypes = {
    i: PropTypes.number,
    landType: PropTypes.string,
    mode: PropTypes.string,
    building: PropTypes.string,
    selected: PropTypes.bool,
    cellData: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseClick: PropTypes.func
};

export default Cell;