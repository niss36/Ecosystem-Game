import React from "react";
import {connect} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Cell from "./Cell";
import {cellMouseClick, cellMouseEnter} from "../../actions";
import {SIZE} from "../../definitions/Map";

import "./Map.css";

function mapStateToProps(state, ownProps) {
    return {
        selected: state.map.selection.cells.includes(ownProps.i),
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onMouseEnter: () => dispatch(cellMouseEnter(ownProps.i)),
        onMouseClick: () => dispatch(cellMouseClick(ownProps.i)),
    }
}

const ConnectedCell = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cell);

class Map extends React.Component {

    render() {

        let cells = new Array(SIZE * SIZE);
        for (let i = 0; i < cells.length; i++) {
            cells[i] = (<ConnectedCell i={i} key={i}/>);
        }

        return (
            <div className="Map-root panel">
                <SettingsMenu/>
                <div className="Map-grid">
                    {cells}
                </div>
            </div>
        );
    }
}

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