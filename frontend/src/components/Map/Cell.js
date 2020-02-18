import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    render() {
        const {i, land, mode, selected, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (selected) {
            classes += " " + mode;
        }
        let style;

        if (land) {
            style = {backgroundColor:"lightgreen",color:"yellow"};
        } else
            style = {color:"blue", backgroundColor:"lightblue" };

        return (
            <p className={classes} onClick={onMouseClick} onMouseEnter={onMouseEnter} style={style}>
                {i}
            </p>
        );
    }
}