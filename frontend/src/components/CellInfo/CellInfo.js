import React from "react";
import {connect} from "react-redux";
import "./CellInfo.css";
import Buildings from "../../definitions/Buildings";

class CellInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        function getValidBuildings(cellType) {
            let list = [];
            for (let x in Buildings){
                if (Buildings[x].requiredCellType === cellType){
                    list.push(<li>{Buildings[x].name}</li>);
                }
            }
            return list;
        }

        function getBuildingInfo(props, Buildings){
            if (props.cellContents !== undefined){
                return "Building: " + Buildings[props.cellContents].name;
            }
            else{
                return <p>Buildings that can be built<ul>{getValidBuildings(props.cellType)}</ul></p>
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
                    </div>
                </div>
            </div>);
    }
}

export default connect(
    state => ({display: state.cellinfo.display,
        cellNo: state.cellinfo.cellNo,
        cellContents: (state.map.cells[state.cellinfo.cellNo]).type,
        cellType: state.map.cellTypes[state.cellinfo.cellNo],
        // TODO ADD SIZE AND NUMBER! AND LET CHANGE IT!!

    }),
)(CellInfo);
