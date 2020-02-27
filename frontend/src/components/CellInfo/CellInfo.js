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
        return (<p>Building: {Buildings[props.cellContents].name}</p>);
    } else {
        return (
            <>
                <p>
                    Buildings that can be built:
                </p>
                <ul>
                    {getValidBuildings(props.cellType)}
                </ul>
            </>
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
                        <p>
                            Cell type: {cellType}
                        </p>
                        {getBuildingInfo(this.props)}
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
