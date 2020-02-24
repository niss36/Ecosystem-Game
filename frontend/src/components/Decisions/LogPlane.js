import React from "react";
import {List, ListItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {logItemConfirm, logItemSelect} from "../../actions";
import {connect} from "react-redux";

function MakeLog(list, onLogClick, selectedIndex){
    let array = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
        const index = i;
        const id = list[i].buildingType;
        const cells = list[i].selectedCells;
        const actionType = list[i].actionType;
        if(i === selectedIndex) {
            array[i] = (
                <ListItem button selected={true}>
                    <ul onClick={onLogClick(index)} type="square">
                        <li>{'Action ' + (index + 1)}</li>
                        <li>{'Action Type - ' + actionType}</li>
                        <li>{'Building affected - ' + id}</li>
                        <li>{'Building locations - ' + cells}</li>
                    </ul>
                    </ListItem>
            )
        }
        else{
            array[i] = (
                <ListItem button>
                    <ul onClick={onLogClick(index)} type="square">
                        <li>{'Action ' + (index + 1)}</li>
                        <li>{'Action Type - ' + actionType}</li>
                        <li>{'Building affected - ' + id}</li>
                        <li>{'Building locations - ' + cells}</li>
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
                Undo Change
            </Button>
            <div>
                One you have made a change it will appear in this log.
            </div>
            <div>
                Click on an action and press 'Undo Change' to revert back to before that change.
            </div>
            <div style={{maxHeight: 600, overflow: 'auto'}}>
            <List>
                {MakeLog(props.commitChange.storedChanges, props.onLogSelect, props.selectedIndex)}
            </List>
            </div>
        </div>
    )
}

const mapStateToLogProps = (state, ownProps) => {
    return {
        ...state.logStorage,
        canConfirm : canConfirmLog(state.logStorage.commitChange.selectedLogIndex.index),
        selectedIndex: state.logStorage.commitChange.selectedLogIndex.index,
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