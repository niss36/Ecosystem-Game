import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./Map.css";
import Cell from "./Cell";

export default class Map extends React.Component {

    render() {
        const {va, vb} = this.props;
        let l = new Array(16*16);
        l.fill(1);
        l = l.map((value, i) => <Cell i={i}></Cell>);

        let dic = {color: "blue", backgroundColor : "gray"};


        return (
            <div className="Map-root panel">
                <SettingsMenu/>
                <div className="grid" style={dic}>
                    {l.map(value => <p>{value}</p>)}
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