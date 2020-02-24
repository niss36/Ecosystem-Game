import React from "react";
import {connect} from "react-redux";

class CellInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className={"CellInfo-root panel"} style={{display: this.props.display}}>
                {this.props.cellNo}
                <br/>
                {this.props.cellContents}
            </div>);
    }
}

export default connect(
    state => ({display: state.cellinfo.display, cellNo: state.cellinfo.cellNo, cellContents: state.map.cells[state.cellinfo.cellNo]}),
)(CellInfo);
