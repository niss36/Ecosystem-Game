import React from "react";
import PropTypes from "prop-types";

import "./Cell.css";

class Cell extends React.Component {

    render() {
        const {i, land,forest, mode, building, selected, cellData, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (land) {
            classes += " land";
        }
        if(forest){
            classes +=" forest";
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
    land: PropTypes.bool,
    forest:PropTypes.bool,
    mode: PropTypes.string,
    building: PropTypes.string,
    selected: PropTypes.bool,
    cellData: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseClick: PropTypes.func
};

export default Cell;