import React from "react";

import {Slider} from "@material-ui/core";

const sizes = [
    {
        value: 10,
        label: "SMALL",
    },
    {
        value: 500,
        label: "MEDIUM",
    },
    {
        value: 1000,
        label: "LARGE",
    },
];

const minSize = 10;

export function SizeSliderPane({value, onChange}) {

    function handleChange(e, v) {
        onChange(v < minSize ? minSize : v);
    }

    return (
        <>
            <div style={{textAlign: "center"}}>
                Minimum size of harvested animals (kg)
            </div>
            <Slider value={value} onChange={handleChange} min={0} max={1000} step={1} valueLabelDisplay="auto" marks={sizes}/>
        </>
    );
}

const efforts = [
    {
        value: 0,
        label: "Low",
    },
    {
        value: 50,
        label: "Mid",
    },
    {
        value: 100,
        label: "High",
    },
];

const minEffort = 10;

export function EffortSliderPane({value, onChange}) {

    function handleChange(e, v) {
        onChange(v < minEffort ? minEffort : v);
    }

    return (
        <>
            <div style={{textAlign: "center"}}>
                Effort (%)
            </div>
            <Slider value={value} onChange={handleChange} min={0} max={100} step={1} valueLabelDisplay="auto" marks={efforts}/>
        </>
    );
}