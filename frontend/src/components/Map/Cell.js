import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    render() {
        const {i, land, mode, selected, onMouseEnter, onMouseClick, cellData} = this.props;

        let classes = "Cell-root";
        if (land) {
            classes += " land";
        }

        if (cellData) {
            classes += " " + cellData;
        } else if (selected) {
            classes += " " + mode;
        }


        return (
            <p className={classes} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                {i}
            </p>
        );
    }
}