import React from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./Map.css";
import Cell from "./Cell";

export default class Map extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            settingsPopupAnchor: null,
        };

        this.openSettingsPopup = this.openSettingsPopup.bind(this);
        this.closeSettingsPopup = this.closeSettingsPopup.bind(this);
    }

    openSettingsPopup(event) {
        this.setState({settingsPopupAnchor: event.currentTarget});
    }

    closeSettingsPopup() {
        this.setState({settingsPopupAnchor: null});
    }

    render() {
        const {va, vb} = this.props;
        let l = new Array(16*16);
        l.fill(1);
        l = l.map((value, i) => <Cell i={i}></Cell>);

        let dic = {color: "blue", backgroundColor : "gray",
            backgroundImage: "url('/uk.svg')",backgroundSize:"cover",backgroundPosition:"center", backgroundRepeat:"no-repeat"};
        return (
            <Grid item xs={12} md={8} className="Map-root">
                <div className="panel">
                    <div className="Map-settings">
                        <IconButton aria-label="map settings" onClick={this.openSettingsPopup}>
                            <Settings/>
                        </IconButton>
                        <Menu
                            id="settings-menu"
                            anchorEl={this.state.settingsPopupAnchor}
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
                            open={Boolean(this.state.settingsPopupAnchor)}
                            onClose={this.closeSettingsPopup}
                        >
                            <MenuItem onClick={this.closeSettingsPopup}>Setting 1</MenuItem>
                            <MenuItem onClick={this.closeSettingsPopup}>Setting 2</MenuItem>
                            <MenuItem onClick={this.closeSettingsPopup}>Setting 3</MenuItem>
                        </Menu>
                    </div>
                    <div className="grid" style={dic}>
                        {l.map(value => <p>{value}</p>)}
                    </div>
                    <p>Map</p>
                </div>
            </Grid>
        );
    }
}