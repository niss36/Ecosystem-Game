import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import "./Menu.css";

class Menu extends React.Component {
    render() {
        return (
                <Box className="Menu-bgimg">
                    <h1 className="Menu-header">Ecosystem Game</h1>
                    <p>
                        This is a proof of concept for a game using the Madingley model developed by UN-WCMC - a
                        complex, general ecosystem model that models interactions between terrestrial and aquatic
                        lifeforms. The game is intended to raise awareness about the impacts of human decisions on
                        the environment and how ecosystems can change due to habitat loss, overexploitation,
                        climate change and many other human influenced factors.
                        The game does not currently interface with the Madingley model, but instead a simplified
                        ecosystem model that just simulates carnivore and herbivore populations, and the effects
                        of human hunting ("harvesting") on them.
                    </p>
                    <p>
                        Click the following links for more information on
                        the <a href="https://madingley.github.io/" target="_blank">Madingley model</a>,
                        and the work of the <a href="https://www.unep-wcmc.org/" target="_blank">UN-WCMC.</a>
                    </p>
                    <Button className="Menu-button" size={"large"} variant="contained" color="primary" onClick={this.props.onStart}>
                        Start
                    </Button>
                </Box>
        );
    }
}

Menu.propTypes = {
    onStart: PropTypes.func,
};

export default Menu;