import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Cell from "./Cell";

import "./Map.css";

export default class Map extends React.Component {

    render() {
        let cells = new Array(16*16);
        for (let i = 0; i < cells.length; i++) {
            cells[i] = (<Cell i={i} key={i}/>);
        }

        return (
            <div className="Map-root panel">
                <SettingsMenu/>
                <div className="Map-grid">
                    {cells}
                </div>
                <p>Map</p>
            </div>
        );
    }
}

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
                    <MenuItem onClick={this.close}>Setting 1</MenuItem>
                    <MenuItem onClick={this.close}>Setting 2</MenuItem>
                    <MenuItem onClick={this.close}>Setting 3</MenuItem>
                </Menu>
            </div>
        );
    }
}