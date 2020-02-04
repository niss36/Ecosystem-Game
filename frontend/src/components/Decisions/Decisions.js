import React from "react";

import "./Decisions.css";

export default class Decisions extends React.Component {

    render() {
        function changeTab(x) {
                var oldX = document.getElementsByClassName("tab active")[0].getAttribute("id");
                document.getElementById(oldX).setAttribute("class", "tab");
                document.getElementById("tab" + x).setAttribute("class", "tab active");
        }
        return (
            <div className="Decisions-root">
                <p>Decisions</p>
                <div className={"tabs"}>
                    <button id={"button1"} type={"button"} onClick={function(){changeTab(1);}}>Tab #1</button>
                    <button id={"button2"} type={"button"} onClick={function(){changeTab(2);}}>Tab #2</button>
                    <button id={"button3"} type={"button"} onClick={function(){changeTab(3);}}>Tab #3</button>
                    <button id={"button4"} type={"button"} onClick={function(){changeTab(4);}}>Tab #4</button>
                    <div className={"tab-content"}>
                        <div id={"tab1"} className={"tab active"}>
                            <p>Tab #1 content goes here!</p>
                        </div>

                        <div id={"tab2"} className={"tab"}>
                            <p>Tab #2 content goes here!</p>
                        </div>

                        <div id={"tab3"} className={"tab"}>
                            <p>Tab #3 content goes here!</p>
                        </div>

                        <div id={"tab4"} className={"tab"}>
                            <p>Tab #4 content goes here!</p>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}