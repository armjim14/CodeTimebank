import React from "react"
import * as d3 from "d3";



const Slice = props =>{
    let { pie } = props;

    let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(100);
    
    let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

    return pie.map((slice, index)=> {
        let sliceColor = interpolate(index/ (pie.length-1));
        // let color = d3.scaleOrdinal()
        // .domain(data)
        // .range(d3.schemeSet3)
        return <path d={arc(slice)} fill={sliceColor}/>;
    });
    
}

export default Slice;