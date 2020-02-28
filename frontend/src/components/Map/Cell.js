import React from "react";
import PropTypes from "prop-types";

import "./Cell.css";
import {cellMouseClick} from "../../actions";

class Cell extends React.Component {

    render() {
        const {i, cellType, mode, building, selected, cellData, sameCellType, onMouseEnter, onMouseClick, logSelection, cellClicked} = this.props;

        let rootClasses = "Cell-root " + cellType;

        let classes = "Cell-content";

        if (selected) {
            if (mode === "remove" || mode === 'log') {
                classes += " remove";
            } else {
                classes += " " + building;
            }
        }
        else{
            if (logSelection.building !== undefined) {
                if (logSelection.cells.includes(i)) {
                    classes += " logSelect";
                }
            }
        }

        if (cellClicked === i){
            classes += " logSelect";
        }

        if (cellData) {
            classes += " " + cellData;
        }

        for (const side of ["top", "right", "bottom", "left"]) {
            if (sameCellType[side]) {
                classes += " " + side;
            }
        }

        return (
            <div className={rootClasses} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                <div className={classes}>
                    {/*{i}*/}
                </div>
            </div>
        );
    }
}

Cell.propTypes = {
    i: PropTypes.number,
    cellType: PropTypes.string,
    mode: PropTypes.string,
    building: PropTypes.string,
    selected: PropTypes.bool,
    cellData: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseClick: PropTypes.func
};

export default Cell;