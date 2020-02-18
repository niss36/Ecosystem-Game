import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // REMOVING ALL STATE FROM CELL
            // all state will be controled by map.js
        };
    }



    render() {
        let i = this.props.i;

        let classes = "Cell-root";
        if (this.props.selected) {
            classes += " toggled";
        }
        let style;

        if (this.props.island.includes(i)) {
            style = {backgroundColor:"lightgreen",color:"yellow"};
        } else
            style = {color:"blue", backgroundColor:"lightblue" };

        return (
            <p className={classes} onClick={() =>this.props.cellMouseclick(i)}
            onMouseEnter={() => this.props.cellMouseMove(i)} /*Stops it calling its self when not o mouse move event*/
                style = {style}
            >
                {i}
            </p>
        );
    }
}
