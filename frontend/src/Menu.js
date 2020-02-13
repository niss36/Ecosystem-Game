import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./Menu.css";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";
import Container from "@material-ui/core/Container";

class Menu extends React.Component {

    renderApp(){
        //Send post request here to server and set up parameters
        ReactDOM.render(<App/>, document.getElementById("root"));
    }

    render(){
        return (
            <Container style={{minHeight: "100vh"}}>
                        <Box className="bgimg" style={{minHeight: "100vh"}}>
                            <h1 style={{position: 'center', margin : '0'}}>Ecosystem Game</h1>
                            <Button className={'test'} variant="contained" color="primary" onClick={this.renderApp}>
                                Start
                            </Button>
                        </Box>
            </Container>
                    );
    }
}

export default Menu;