import React from "react";

export default class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled : false
        };

    }



    render() {
        let i = this.props.i;

        // this.clicked();
        let style = this.state.toggled ? {color: "red", backgroundColor : "blue", user_select : "none"}
        : {color: "blue", backgroundColor : "gray", user_select : "none"}; // user_select none doesnt work

        return (
        <p style={style} onClick={() => this.setState({toggled :!this.state.toggled})}> {i} </p>
        )

    }

}
