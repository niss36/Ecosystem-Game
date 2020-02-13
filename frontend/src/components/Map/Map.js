import React from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Cell from "./Cell";

import "./Map.css";

const size = 16;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndexs: [],
        };

        this.cellMouseMove = this.cellMouseMove.bind(this);
        this.cellMouseclick = this.cellMouseclick.bind(this);
    }


    cellMouseMove(i) {
        if (this.props.mapargs.selectionMode) { //looking inside a dic of dic
            if ((i % size) < 1) { i++;}
            if ((i % size) === size - 1) {i--;}
            if (i < size) {i += size}
            if (i > size * (size - 1)) {i -= size}
            this.setState({selectedIndexs: [i, i + 1, i - 1, i - size, i - size + 1, i - size - 1, i + size, i + size + 1, i + size - 1]});
        }
    }
    cellMouseclick(i) {
        if (!this.props.mapargs.selectionMode) {
            this.setState({selectedIndexs :[i]});
        } else {
            //TODO when app.js cells is done
            //call fun in app.js
            // clear selection
            // display image
        }

    }


    render() {

        const {selectedIndexs } = this.state;

        let cells = new Array(size * size);
        for (let i = 0; i < cells.length; i++) {
            if (this.props.mapargs.selectionMode && selectedIndexs.includes(i)) {

                cells[i] = (<Cell cellMouseMove={this.cellMouseMove}
                                  cellMouseclick={this.cellMouseclick}
                                  selected={true} i={i} key={i}/>);
            } else {
                cells[i] = (<Cell cellMouseMove={this.cellMouseMove}
                                  cellMouseclick={this.cellMouseclick}
                                  selected={false} i={i} key={i}/>);
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