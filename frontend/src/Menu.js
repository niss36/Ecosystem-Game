import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Footer from "./components/Footer";

import "./Menu.css";

class Menu extends React.Component {
    render() {
        return (
            <div className="Menu-root">
                <Container className="Menu-container">
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
                        the <a href="https://madingley.github.io/" target="_blank" rel="noopener noreferrer">Madingley model</a>,
                        and the work of the <a href="https://www.unep-wcmc.org/" target="_blank" rel="noopener noreferrer">UN-WCMC.</a>
                    </p>
                    <div className="flex-grow-1"/>
                    <Button className="Menu-button" variant="contained" color="primary" onClick={this.props.onStart}>
                        Start
                    </Button>
                    <div className="flex-grow-1"/>
                </Container>
                <Footer/>
            </div>
        );
    }
}

Menu.propTypes = {
    onStart: PropTypes.func,
};

export default Menu;