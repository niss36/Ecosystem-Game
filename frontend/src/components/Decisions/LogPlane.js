import React from "react";
import {List, ListItem, ListItemText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {logItemConfirm, logItemSelect} from "../../actions";
import {connect} from "react-redux";

function MakeLog(list, onLogClick, selectedIndex){
    let array = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
        const index = i;
        const id = list[i].buildingType;
        const cells = list[i].selectedCells;
        const changeValue = list[i].changeValue;
        const actionType = list[i].actionType;
        if(i === selectedIndex) {
            array[i] = (
                <ListItem button key={index} id={id} cells={cells} changevalue={changeValue} selected={true}>
                    <ul onClick={onLogClick(index)} type="square">
                        <li>{'Change Number: ' + (index + 1)}</li>
                        <li>{'Action Type: ' + actionType}</li>
                        <li>{'Building: ' + id}</li>
                        <li>{'Located Cells: ' + cells}</li>
                        <li>{' Effort: ' + changeValue}</li>
                    </ul>
                    </ListItem>
            )
        }
        else{
            array[i] = (
                <ListItem button key={index} id={id} cells={cells} changevalue={changeValue}>
                    <ul onClick={onLogClick(index)} type="square">
                        <li>{'Change Number: ' + (index + 1)}</li>
                        <li>{'Action Type: ' + actionType}</li>
                        <li>{'Building: ' + id}</li>
                        <li>{'Located Cells: ' + cells}</li>
                        <li>{' Effort: ' + changeValue}</li>
                    </ul>
                    </ListItem>
            )
        }
    }
    return array;
}

function makeLogPlane({...props}){
    return (
        <div>
            <Button onClick={props.onLogConfirm(props.commitChange.selectedLogIndex)} disabled={props.canConfirm} variant="outlined" fullWidth={true} >
                Commit Log Change
            </Button>
            <div style={{maxHeight: 700, overflow: 'auto'}}>
            <List>
                {MakeLog(props.commitChange.storedChanges, props.onLogSelect, props.selectedIndex)}
            </List>
            </div>
        </div>
    )
}

const mapStateToLogProps = (state, ownProps) => {
    return {
        ...state.data,
        canConfirm : canConfirmLog(state.data.commitChange.selectedLogIndex.index),
        selectedIndex: state.data.commitChange.selectedLogIndex.index,
    };
};

const mapDispatchToLogProps = (dispatch, ownProps) => {
    return {
        onLogSelect: (index) => function(){ dispatch(logItemSelect(index));},
        onLogConfirm: (selectedItem) => (logItemConfirm(selectedItem.index, [...selectedItem.selectedDel], dispatch)),
    }
};

const ConnectedLogList = connect(
    mapStateToLogProps,
    mapDispatchToLogProps,
)(makeLogPlane);

function canConfirmLog(indexState){
    return (indexState === "undefined");
}

class LogPlane extends React.Component {

    render(){
        return (
            <ConnectedLogList/>
        )
    }
}

export default LogPlane;