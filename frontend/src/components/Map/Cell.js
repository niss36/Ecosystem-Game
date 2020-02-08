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
            <p className={classes} onClick={() => this.setState({toggled: !this.state.toggled})}>
                {i}
            </p>
        );
    }
}
