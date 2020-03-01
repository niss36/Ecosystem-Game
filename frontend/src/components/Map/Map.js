import React from "react";
import {connect} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {cellMouseClick, cellMouseEnter, changeCellInfo, changeOverlay, setDifficulty} from "../../actions";

import {BIOMASS, HARVEST_EFFORT, HARVESTED_BIOMASS, SIZE} from "../../definitions/Map";

import Cell from "./Cell";

import "./Map.css";
import {normalize} from "../../definitions/Util";

function mapStateToProps(state, ownProps) {
    let biomass = normalize(state.modelData.state.herbivoreBiomasses[ownProps.i] + state.modelData.state.carnivoreBiomasses[ownProps.i]);
    return {
        cellType: state.map.cellTypes[ownProps.i],
        mode: state.map.selection.mode,
        building: state.map.selection.building,
        selected: state.map.selection.cells.includes(ownProps.i),
        cellData: (state.map.cells[ownProps.i]),
        sameCellType: state.map.sameCellTypes[ownProps.i],
        logSelection: state.map.logSelection,
        overlay: state.map.overlay,
        cellClicked: state.map.cellClicked,
        harvestAmout: state.modelData.harvestedBiomasses[ownProps.i],
        cellBiomass: biomass
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
            cells[i] = <ConnectedCell i={i} key={i}/>;
        }

        return (
            <div className="Map-root panel">
                <ConnectedSettingsMenu/>
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
            diffDisplay: 'none',
            mainDisplay: 'block',
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
    overlayMethod(type){
        return () => this.props.changeOverlay(type);
    }

    render() {
        return (
            <div className="Map-settings">
                <IconButton aria-label="map settings" onClick={this.open}>
                    <TrackChangesIcon/>
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
                    Overlay
                    <MenuItem style={{display:this.state.mainDisplay}} onClick={this.overlayMethod(HARVEST_EFFORT)}>Harvest Efforts</MenuItem>
                    <MenuItem style={{display:this.state.mainDisplay}} onClick={this.overlayMethod(BIOMASS)}>Cell Biomass</MenuItem>
                    <MenuItem style={{display:this.state.mainDisplay}} onClick={this.overlayMethod(HARVESTED_BIOMASS)}>Last Turn Harvested Biomass</MenuItem>
                    <MenuItem style={{display:this.state.mainDisplay}} onClick={this.overlayMethod(undefined)}>None</MenuItem>
                    <MenuItem style={{display:this.state.mainDisplay}} onClick={this.close}>Close</MenuItem>
                </Menu>
            </div>
        );
    }
}

function otherDispatchToProps(dispatch) {
    return {
        changeOverlay: (newOverlay) => dispatch(changeOverlay(newOverlay)),
    }
}

const ConnectedSettingsMenu = connect(
    null,
    otherDispatchToProps,
)(SettingsMenu);
