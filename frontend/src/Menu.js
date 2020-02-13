import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import "./Menu.css";

class Menu extends React.Component {
    render() {
        return (
            <Container className="Menu-root">
                <Box className="Menu-bgimg">
                    <h1 className="Menu-header">Ecosystem Game</h1>
                    <Button className="Menu-button" variant="contained" color="primary" onClick={this.props.onStart}>
                        Start
                    </Button>
                </Box>
            </Container>
        );
    }
}

Menu.propTypes = {
    onStart: PropTypes.func,
};

export default Menu;