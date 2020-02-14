import React from "react";

import {green, lime, orange, red, yellow} from "@material-ui/core/colors";

import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import resources from "../../definitions/Resources";

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

function GenericResourcePane({id, value, children}) {

    const {name, icon} = resources[id];

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} IconButtonProps={{edge: false, disableTouchRipple: true}}>
                <img src={icon} alt="" height={25}/>
                <div className="flex-grow-1 ResourcePanes-name">{name}:</div>
                <div className="ResourcePanes-value">{value}</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export function ResourcePane({id, amount, income}) {

    const value = <>{amount} (+{income.total}/month)</>;

    return (
        <GenericResourcePane id={id} value={value}>
            {
                Object.entries(income.breakdown).map(([id, v]) => <div key={id}>{id}: +{v}/month</div>)
            }
        </GenericResourcePane>
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

export function HappinessPane({id, happiness}) {

    const classes = useHappinessStyles();
    const classesArray = [classes.veryLow, classes.low, classes.medium, classes.high, classes.veryHigh];

    const ix = Math.min(4, Math.max(0, Math.floor(happiness / 20)));
    const className = classesArray[ix];

    const value = <div className={classes.root + " " + className}>{happiness}%</div>;

    return (
        <GenericResourcePane id={id} value={value}>
            <div>Base: 100%</div>
            <div>Taxes: -20%</div>
            <div>Pollution: -10%</div>
        </GenericResourcePane>
    );
}

export function PopulationPane({id, population, food}) {

    const value = <>{population}</>;

    return (
        <GenericResourcePane id={id} value={value}>
            <div/>
        </GenericResourcePane>
    );
}