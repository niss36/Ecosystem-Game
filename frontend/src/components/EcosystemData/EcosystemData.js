import React from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts';

import TabsPane from "../util/TabsPane";

import "./EcosystemData.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {green, lime, orange, red, yellow} from "@material-ui/core/colors";

const CustomizedDot = (props) => {
    const {
        cx, cy, stroke, payload, value,
    } = props;

    const colourArray = [red[800], orange[800], yellow[800], lime[800], green[800]];

    function getHappinessCol(happiness) {
        const ix = Math.min(4, Math.max(0, Math.floor(happiness / 20)));
        return colourArray[ix];
    }

    if (value > 49) {
        return (
            <svg x={cx - 10} y={cy - 10} width={20} height={20} fill={getHappinessCol(value)} viewBox="0 0 1024 1024">
                <path
                    d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z"/>
            </svg>
        );
    }

    return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill={getHappinessCol(value)} viewBox="0 0 1024 1024">
            <path
                d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/>
        </svg>
    );
};

function getDate(timestamp) {
    //currently initial date is June 2020, can change later, and timesteps are simply yearly
    return "June " + (2020 + timestamp)


}


export default class EcosystemData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            //current datakey being plotted by graphs on Population/Happiness tab
            currentPopTab: "pop",

            //Radio button state for Resources tab
            moneyChecked: true,
            foodChecked: false,
            woodChecked: false,


            //Dummy dataset:
            data: [
                {timestamp: 0, date: getDate(0), pop: 100, happiness: 100, money: 150, food: 240, wood: 170},
                {timestamp: 1, date: getDate(1), pop: 200, happiness: 91, money: 500, food: 200, wood: 220},
                {timestamp: 2, date: getDate(2), pop: 350, happiness: 72, money: 400, food: 150, wood: 270},
                {timestamp: 3, date: getDate(3), pop: 600, happiness: 63, money: 350, food: 100, wood: 120},
                {timestamp: 4, date: getDate(4), pop: 500, happiness: 45, money: 700, food: 50, wood: 20},
                {timestamp: 5, date: getDate(5), pop: 150, happiness: 24, money: 200, food: 20, wood: 120},
                {timestamp: 6, date: getDate(6), pop: 50, happiness: 5, money: 100, food: 10, wood: 220},
            ],
        }
    }

    render() {
        return (
            <div className="panel">
                <TabsPane tabs={["Population & Infrastructure", "Resources"]}>
                    <div>
                        <Grid container>
                            <Grid item xs={3}>
                                <div>
                                    <Button
                                        disabled={(this.state.currentPopTab === "pop")}
                                        onClick={() => this.setState({currentPopTab: "pop"})}
                                    >
                                        Population
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        disabled={(this.state.currentPopTab === "happiness")}
                                        onClick={() => this.setState({currentPopTab: "happiness"})}
                                    >
                                        Happiness
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        data={this.state.data}
                                        margin={{
                                            top: 20, right: 20, left: 0, bottom: 10,
                                        }}
                                    >
                                        {(this.state.currentPopTab === "happiness" ?
                                            //if happiness graph
                                            <Line type="monotone" stroke={green[400]} dataKey="happiness"
                                                  dot={<CustomizedDot/>}/>
                                            :
                                            //if population graph
                                            <Line type="monotone" stroke="green" dataKey="pop"/>)
                                        }

                                        {(this.state.currentPopTab === "pop") &&
                                            //if population graph, add a grid
                                            <CartesianGrid strokeDasharray="3 3"/>
                                        }
                                        <YAxis/>
                                        <XAxis dataKey="date"/>
                                        <Tooltip/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid container>
                            <Grid item xs={3}>
                                <div><input
                                    type="checkbox"
                                    checked={this.state.moneyChecked}
                                    onChange={() => this.setState({moneyChecked: !this.state.moneyChecked})}
                                />
                                    Money
                                </div>
                                <div><input
                                    type="checkbox"
                                    checked={this.state.foodChecked}
                                    onChange={() => this.setState({foodChecked: !this.state.foodChecked})}
                                />
                                    Food
                                </div>
                                <div><input
                                    type="checkbox"
                                    checked={this.state.woodChecked}
                                    onChange={() => this.setState({woodChecked: !this.state.woodChecked})}
                                />
                                    Wood
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart
                                        data={this.state.data}
                                        margin={{
                                            top: 20, right: 20, left: 0, bottom: 10,
                                        }}
                                    >

                                        {(this.state.moneyChecked &&
                                            //if money checked, draw its line
                                            <Line type="monotone" stroke="#ccbe00" dataKey="money"
                                                  isAnimationActive={false}/>
                                        )}

                                        {(this.state.foodChecked &&
                                            //if food checked, draw its line
                                            <Line type="monotone" stroke="#009603" dataKey="food"
                                                  isAnimationActive={false}/>
                                        )}

                                        {(this.state.woodChecked &&
                                            //if wood checked, draw its line
                                            <Line type="monotone" stroke="#946300" dataKey="wood"
                                                  isAnimationActive={false}/>
                                        )}
                                        <YAxis/>
                                        <Tooltip/>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="date"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>
                    </div>
                </TabsPane>
            </div>
        );
    }
}