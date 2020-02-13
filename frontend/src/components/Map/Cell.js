import React from "react";

import "./Cell.css";

export default class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggled: false
        };
    }



    render() {
        let i = this.props.i;


        let classes = "Cell-root";
        if (this.state.toggled) {
            classes += " toggled";
        }

        return (
            <p className={classes} onClick={() =>this.props.cellMouseclick(i)}
            onMouseEnter={() => this.props.cellMouseMove(i)} /*Stops it calling its self when not o mouse move event*/
            >
                {i}
            </p>
        );
    }
}
