import React from "react";

import "./Button.css";

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggled: false
        };
    }

    render(){
        let content = this.props.content;

        let classes = "Button-root";
        if(this.state.toggled){
            classes += " toggled";
        }

        return(
            <span className={classes} onClick={() => this.setState({toggled: !this.state.toggled})}>
              {content}
            </span>
        )
    }
}