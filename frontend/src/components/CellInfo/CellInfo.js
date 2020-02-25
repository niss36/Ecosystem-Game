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
        return (
            <div className={"CellInfo-root panel"} style={{display: this.props.display}}>
                <div className={"CellInfo-header"}>
                    <span>Cell Number {this.props.cellNo}</span>
                </div>
                <div className={"CellInfo-contents"}>
                    {this.props.cellType}
                    <br/>
                    {this.props.cellContents && Buildings[this.props.cellContents].name}
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
