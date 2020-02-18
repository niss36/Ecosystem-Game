import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Cell from "./Cell";

import "./Map.css";

const size = 20;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fishingSelected: [],
            huntingSelected: [],
            island :[210,211,231,271,251,270,269,250,230,247,229,249,209,227,189,188,190,192,228,232,191,208,212,206,252,272,246,187,245,207,226,168,170,169,171,293,292,268,266,248,290,291,287,310,307,289,306,308,267,309,286,288,311,312,233,213,173,153,174,175,176,196,217,216,236,172,152,193,154,235,197,177,329,330,331,326,265,305,225,186,149,151,150,131,132,304,325,166,148,108,128,110,109,130,89,88,90,129,111,107,127,87,106,86,105,125,124,165,163,185,205,224,184,164,204,69,68]
            //maybe make set or sort idk...
        };

        this.cellMouseMove = this.cellMouseMove.bind(this);
        this.cellMouseclick = this.cellMouseclick.bind(this);
    }


    cellMouseMove(i) {
        if (this.props.mapargs.fishing) { //looking inside a dic of dic
            if ((i % size) < 1) { i++;}
            if ((i % size) === size - 1) {i--;}
            if (i < size) {i += size}
            if (i > size * (size - 1)) {i -= size}
            this.setState({fishingSelected: [i, i + 1, i - 1, i - size, i - size + 1, i - size - 1, i + size, i + size + 1, i + size - 1]});
        } else if (this.props.mapargs.hunting) { //looking inside a dic of dic
            if ((i % size) < 1) { i++;}
            if ((i % size) === size - 1) {i--;}
            if (i < size) {i += size}
            if (i > size * (size - 1)) {i -= size}
            this.setState({huntingSelected: [i, i + 1, i+size, i+size+1]});
        }
    }
    cellMouseclick(i) {
        // temp code to change map
        if (!this.state.island.includes(i)) {
            this.setState({island: [...this.state.island, i]});
        } else {
            this.setState({island: this.state.island.filter( item => item !== i)
                    });
        }
        let log = "[";
        for (const x of this.state.island) {
            log+= x+","
        } console.log(log);



        if (this.props.mapargs.fishing) {
            //TODO when app.js cells is done
            //call fun in app.js
            // clear selection
            // display image
        }

    }


    render() {

        const {fishingSelected,island, huntingSelected} = this.state;

        let cells = new Array(size * size);
        for (let i = 0; i < cells.length; i++) {
            if (this.props.mapargs.fishing && fishingSelected.includes(i)&& !island.includes(i)) {

                cells[i] = (<Cell cellMouseMove={this.cellMouseMove}
                                  cellMouseclick={this.cellMouseclick}
                                  fishingSelected={true} i={i}
                                  huntingSelected={false}
                                  island={this.state.island} />);
            } else if (this.props.mapargs.hunting && huntingSelected.includes(i)&& island.includes(i)) {
                cells[i] = (<Cell cellMouseMove={this.cellMouseMove}
                                  cellMouseclick={this.cellMouseclick}
                                  fishingSelected={false} i={i}
                                  huntingSelected={true}
                                  island={this.state.island} />);
            }
            else {
                cells[i] = (<Cell cellMouseMove={this.cellMouseMove}
                                  cellMouseclick={this.cellMouseclick}
                                  fishingSelected={false} i={i}
                                  huntingSelected={false}
                                  island={this.state.island} />);
            }
        }

        return (
            <div className="Map-root panel">
                <SettingsMenu/>
                <div className="Map-grid"
                     onMouseDown={this.onMouseDown}
                     onMouseMove={this.mousemove}>
                    {cells}
                </div>
            </div>
        );
    }
}

Map.propTypes = {
    mapargs: PropTypes.any,
};

export default Map;

class SettingsMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchor: null,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(event) {
        this.setState({anchor: event.currentTarget});
    }

    close() {
        this.setState({anchor: null});
    }

    render() {
        return (
            <div className="Map-settings">
                <IconButton aria-label="map settings" onClick={this.open}>
                    <Settings/>
                </IconButton>
                <Menu
                    id="settings-menu"
                    anchorEl={this.state.anchor}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    open={Boolean(this.state.anchor)}
                    onClose={this.close}
                >
                    <MenuItem onClick={this.close}>Colour blind mode</MenuItem>
                    <MenuItem onClick={this.close}>Overlay</MenuItem>
                    <MenuItem onClick={this.close}>Difficulty</MenuItem>
                </Menu>
            </div>
        );
    }
}