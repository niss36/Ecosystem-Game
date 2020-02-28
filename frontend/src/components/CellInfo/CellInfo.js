import React from "react";
import {connect} from "react-redux";

import {changeCellInfo} from "../../actions";

import Buildings from "../../definitions/Buildings";

import {EffortSliderPane, SizeSliderPane} from "../util/Sliders";

import "./CellInfo.css";

function getValidBuildings(cellType) {
    let list = [];
    for (let x in Buildings) {
        if (Buildings[x].requiredCellType === cellType) {
            list.push(<li key={x}>{Buildings[x].name}</li>);
        }
    }
    return list;
}

function getBuildingInfo(props) {
    if (props.cellContents) {
        return (<div className={"buildingPane"}>{Buildings[props.cellContents].name}</div>);
    } else {
        return (
            <div className={"buildingPane"}>
                No building, you could possibly build
                <ul>
                    {getValidBuildings(props.cellType)}
                </ul>
            </div>
        );
    }
}

class CellInfo extends React.Component {
    render() {

        const {display, cellNo, cellType, cellSize, cellEffort} = this.props;

        return (
            <div className={"CellInfo-root"} style={{display: display}}>
                <div>
                    <div className={"CellInfo-header"}>
                        <h3>Cell Info</h3>
                    </div>
                    <div className={"CellInfo-contents"}>
                        <div style={{borderBottom: "1px solid lightgray"}}>
                            {cellType}
                        </div>
                        {getBuildingInfo(this.props)}
                        <div style={{padding: "20px"}}>
                        {
                            cellSize && (
                                <SizeSliderPane value={cellSize} onChange={value => this.props.changeCell(cellNo, "size", value)}/>
                            )
                        }
                        {
                            cellEffort && (
                                <EffortSliderPane value={cellEffort} onChange={value => this.props.changeCell(cellNo, "effort", value)}/>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    const i = state.cellInfo.cellNo;
    const cell = state.map.cells[i];

    return {
        display: state.cellInfo.display,
        cellNo: i,
        cellContents: cell.type,
        cellSize: cell.size,
        cellEffort: cell.effort,
        cellType: state.map.cellTypes[i],
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCell: (cellNo, slider, newValue) => dispatch(changeCellInfo(cellNo, slider, newValue)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CellInfo);
