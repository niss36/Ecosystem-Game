import React from "react";
import {connect} from "react-redux";

import Slider from "@material-ui/core/Slider";

import {changeCellInfo} from "../../actions";

import Buildings from "../../definitions/Buildings";

import "./CellInfo.css";

const sizes = [
    {
        value: 10,
        label: 'SMALL',
    },
    {
        value: 500,
        label: 'MEDIUM',
    },
    {
        value: 1000,
        label: 'LARGE',
    },
];
const types = [
    {
        value: 0,
        label: 'Low',
    },
    {
        value: 50,
        label: 'Mid',
    },
    {
        value: 100,
        label: 'High',
    },
];

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
        return (
            <div className={"CellInfo-root"} style={{display: this.props.display}}>
                <div>
                    <div className={"CellInfo-header"}>
                        <h3>Cell Info</h3>
                    </div>
                    <div className={"CellInfo-contents"}>
                        <p>
                            Cell type: {this.props.cellType}
                        </p>
                        {getBuildingInfo(this.props)}
                        {
                            this.props.cellSize && (<div>

                                    <div style={{textAlign: "center"}}>
                                        Max size of hunted animal in kg
                                    </div>
                                    <Slider marks={sizes} min={0} max={1000} step={1} valueLabelDisplay="auto"
                                            value={this.props.cellSize} onChange={((event, value) => {
                                        this.props.changeCell(this.props.cellNo, "size", value < 10 ? 10 : value);
                                    })}
                                    />
                                </div>
                            )
                        }
                        {
                            this.props.cellEffort && (<div>
                                    <div style={{textAlign: "center"}}>
                                        Effort
                                    </div>
                                    <Slider step={1} marks={types} min={0} max={100} valueLabelDisplay="auto"
                                            value={this.props.cellEffort}
                                            onChange={((event, value) => {
                                                this.props.changeCell(this.props.cellNo, "effort", value < 10 ? 10 : value);
                                            })}
                                    />
                                </div>
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
