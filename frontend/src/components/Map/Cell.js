import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    render() {
        const {i, selected, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (selected) {
            classes += " toggled";
        }

        return (
            <p className={classes} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                {i}
            </p>
        );
    }
}