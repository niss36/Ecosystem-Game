import React from "react";
import {connect} from "react-redux";
import "./CellInfo.css";

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
                    {this.props.cellContents}
                    <br/>
                    Land? {this.props.land}
                </div>
            </div>);
    }
}

export default connect(
    state => ({display: state.cellinfo.display,
        cellNo: state.cellinfo.cellNo,
        cellContents: state.map.cells[state.cellinfo.cellNo],
        land: state.map.island.includes(state.cellinfo.cellNo),
    }),
)(CellInfo);
