import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    render() {
        const {i, land, mode, building, selected, cellData, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (land) {
            classes += " land";
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