import React from "react";
import PropTypes from "prop-types";

import "./Cell.css";

class Cell extends React.Component {

    render() {
        const {i, cellType, mode, building, selected, cellData, sameCellType, onMouseEnter, onMouseClick} = this.props;

        let rootClasses = "Cell-root " + cellType;

        let classes = "Cell-content";

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