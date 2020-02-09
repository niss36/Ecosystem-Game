import React from "react";

import {green, lime, orange, red, yellow} from "@material-ui/core/colors";

import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const ExpansionPanel = withStyles({
    root: {
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: "1px solid lightgray",
        },
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
        justifyContent: "space-between",
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

export function ResourcePane({name, amount, income}) {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <div>{name}:</div>
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

export function HappinessPane({happiness}) {

    const classes = useHappinessStyles();

    const className = happiness > 80 ? classes.veryHigh : (happiness > 60 ? classes.high : (happiness > 40 ? classes.medium : (happiness > 20 ? classes.low : classes.veryLow)));

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <div>Happiness:</div>
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