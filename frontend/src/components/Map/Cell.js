import React from "react";
import PropTypes from "prop-types";

import "./Cell.css";
import {cellMouseClick} from "../../actions";

class Cell extends React.Component {

    render() {
        const {i, cellType, mode, building, selected, cellData, sameCellType, onMouseEnter, onMouseClick, logSelection, cellClicked,harvestAmout, cellBiomass} = this.props;

        let rootClasses = "Cell-root " + cellType;

        let classes = "Cell-content";

        let overlayClasses = "Cell-overlay";


        if (selected) {
            if (mode === "remove" || mode === 'log') {
                classes += " remove";
            } else {
                classes += " " + building;
            }
        }
        else if (cellClicked === i){
            classes += " clickSelect";
        }
        else{
            if (logSelection.building !== undefined) {
                if (logSelection.cells.includes(i)) {
                    classes += " logSelect";
                }
            }
        }

        if (cellData) {
            classes += " " + cellData.type;
        }

        for (const side of ["top", "right", "bottom", "left"]) {
            if (sameCellType[side]) {
                classes += " " + side;
            }
        }

        let overlayStyle = {};
        switch (this.props.overlay) {
            case "harvest":
                if (cellData.effort !== undefined) {
                    console.log(this.props.overlay);

                    let effort = cellData.effort;
                    const start = [255, 0, 0];
                    const end = [0, 255, 0];

                    const out = new Array(3);
                    for (let i = 0; i < 3; i++) {
                        out[i] = Math.floor(start[i] * effort / 100 + end[i] * (100 - effort) / 100);
                    }

                    console.log(effort);
                    console.log(out);

                    overlayStyle.backgroundColor = "rgb(" + out[0] + "," + out[1] + "," + out[2] + ")";
                }

                break;
            case "sizes":
                const start = [0, 255, 0];
                const end = [255, 0, 0];
                const out = new Array(3);
                let normalised = Math.floor(cellBiomass/Math.pow(10, 8));
                for (let i = 0; i<3; i++) {
                    out[i] = Math.floor(start[i] * normalised / 100 + end[i] * (100 - normalised) / 100);
                }
                overlayStyle.backgroundColor = "rgb(" + out[0] + "," + out[1] + "," + out[2] + ")";
                break;

            case "boimass":

                if (harvestAmout !== undefined) {
                    console.log(harvestAmout);

                    let chnagedamout = (harvestAmout/3_500_000)*100;
                    console.log(chnagedamout);
                    const start = [255, 0, 0];
                    const end = [0, 255, 0];

                    const out = new Array(3);
                    for (let i = 0; i < 3; i++) {
                        out[i] = Math.floor(start[i] * chnagedamout / 100 + end[i] * (100 - chnagedamout) / 100);
                    }


                    overlayStyle.backgroundColor = "rgb(" + out[0] + "," + out[1] + "," + out[2] + ")";
                }



                break;
            case undefined:
                break;
        }

        return (
            <div className={rootClasses} onClick={onMouseClick} onMouseEnter={onMouseEnter}>
                <div className={overlayClasses} style={overlayStyle}/>
                <div className={classes} >
                    {/*{i}*/}
                </div>
            </div>
        );
    }
}

Cell.propTypes = {
    i: PropTypes.number,
    cellType: PropTypes.string,
    mode: PropTypes.string,
    building: PropTypes.string,
    selected: PropTypes.bool,
    cellData: PropTypes.shape({
        type: PropTypes.string,
        effort: PropTypes.number,
    }),
    onMouseEnter: PropTypes.func,
    onMouseClick: PropTypes.func
};

export default Cell;