import React from "react";
import {connect} from "react-redux";
import "./CellInfo.css";
import Buildings from "../../definitions/Buildings";
import Slider from "@material-ui/core/Slider";
import BuildingPane from "../Decisions/BuildingPane";
import {cellMouseClick, cellMouseEnter, changeCellInfo} from "../../actions";

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

class CellInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        function getValidBuildings(cellType) {
            let list = [];
            for (let x in Buildings) {
                if (Buildings[x].requiredCellType === cellType) {
                    list.push(<li>{Buildings[x].name}</li>);
                }
            }
            return list;
        }

        function getBuildingInfo(props, Buildings) {
            if (props.cellContents !== undefined) {
                return "Building: " + Buildings[props.cellContents].name;
            } else {
                return <p>Buildings that can be built
                    <ul>{getValidBuildings(props.cellType)}</ul>
                </p>
            }
        }

        return (
            <div className={"CellInfo-root"} style={{display: this.props.display}}>
                <div>
                    <div className={"CellInfo-header"}>
                        <h3>Cell Info</h3>
                    </div>
                    <div className={"CellInfo-contents"}>
                        <div>
                            {"Cell type: " + this.props.cellType}
                        </div>
                        <div>
                            {getBuildingInfo(this.props, Buildings)}
                        </div>
                        <div>

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
                </div>
            </div>);
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeCell: (cellNo, slider, newValue) => dispatch(changeCellInfo(cellNo, slider, newValue)),
    }
}

export default connect(
    state => ({
        display: state.cellinfo.display,
        cellNo: state.cellinfo.cellNo,
        cellContents: (state.map.cells[state.cellinfo.cellNo]).type,
        cellSize: (state.map.cells[state.cellinfo.cellNo]).size,
        cellEffort: (state.map.cells[state.cellinfo.cellNo]).effort,
        cellType: state.map.cellTypes[state.cellinfo.cellNo],

    }),
    mapDispatchToProps,
)(CellInfo);
