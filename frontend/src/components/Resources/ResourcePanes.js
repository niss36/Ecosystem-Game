import React from "react";

import {green, lime, orange, red, yellow} from "@material-ui/core/colors";

import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./ResourcePanes.css";

const ExpansionPanel = withStyles({
    root: {
        boxShadow: "none",
        borderBottom: "1px solid lightgray",
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "unset",
        }
    },
    expanded: {},
}, {name: "ExpansionPanel"})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        padding: 0,
        minHeight: 0,
        "&$expanded": {
            minHeight: 0,
        },
    },
    content: {
        overflow: "hidden",
        margin: "4px 0",
        "&$expanded": {
            margin: "4px 0",
        },
    },
    expandIcon: {
        padding: 0,
        order: -1,
    },
    expanded: {},
}, {name: "ExpansionPanelSummary"})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1, 1, 3),
        flexDirection: "column",
    },
}), {name: "ExpansionPanelDetails"})(MuiExpansionPanelDetails);

export function ResourcePane({name, icon,amount, income}) {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <img src={icon} height={25}/>
                <div className="flex-grow-1 ResourcePanes-name">{name}:</div>
                <div style={{whiteSpace: "nowrap", overflow: "ellipsis"}}>{amount} (+{income}/month)</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                Taxes: ...
                {/*TODO*/}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

const useHappinessStyles = makeStyles({
    root: {
        fontWeight: 'bold',
    },
    veryHigh: {
        color: green[800],
    },
    high: {
        color: lime[800],
    },
    medium: {
        color: yellow[800],
    },
    low: {
        color: orange[800],
    },
    veryLow: {
        color: red[800],
    }
});

export function HappinessPane({happiness,icon}) {

    const classes = useHappinessStyles();

    const classesArray = [classes.veryLow, classes.low, classes.medium, classes.high, classes.veryHigh];

    const ix = Math.min(4, Math.max(0, Math.floor(happiness / 20)));

    const className = classesArray[ix];

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <img src={icon} height={25}/>
                <div className="flex-grow-1 ResourcePanes-name">Happiness:</div>
                <div className={classes.root + " " + className}>{happiness}%</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>Base: 100%</div>
                <div>Taxes: -20%</div>
                <div>Pollution: -10%</div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export function PopulationPane({population, food,icon}) {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <img src={icon} height={25}/>
                <div className="flex-grow-1 ResourcePanes-name">Population:</div>
                <div>{population}</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div></div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}