import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    render() {
        const {i, fishingSelected, onMouseEnter, onMouseClick} = this.props;

        let classes = "Cell-root";
        if (fishingSelected) {
            classes += " boat";
        }
        else if (this.props.huntingSelected) {
            classes += " hunting";
        }
        let style;

        if (this.props.island.includes(i)) {
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