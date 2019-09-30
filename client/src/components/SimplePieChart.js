import React from "react";
import * as d3 from "d3";
import Slice from "./Slice"
import languages from "./languages.json";
const data =[1,2,3,4]
// const data = {"JavaScript":5, "HTML":9,"Python": 1, "Java":2}
export const SimplePieChart =()=>{
    const height = 400;
    const width = 400;
    let pie= d3.pie()(data)
    // .value(function(d) {return d.value;})
    // let data_ready = pie(d3.entries(data))
    console.log(languages)

    return(
        <svg height={height} width={width}>
            <g transform={`translate(${width/2},${height/2})`}>
                <Slice pie={pie}/>
            </g>


        </svg>
    )
};

export default SimplePieChart;