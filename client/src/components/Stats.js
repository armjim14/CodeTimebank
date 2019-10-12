import React, { useEffect, useContext } from "react";
import AuthContext from "../Context/auth/authContext";
import * as d3 from "d3";
// import * as d3Scale from "d3-scale"

const Stats = props => {
  const authContext = useContext(AuthContext);
  const { arr } = authContext;
  useEffect(() => {
    if (arr.length !== 0 && arr !== undefined) {
      console.log(arr);
      setTimeout(drawChart, 1500);
      // drawChart();
    }
    //eslint-disable-next-line
  }, [arr]);

  //https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
  const drawChart = () => {
    const margin = { top: 20, right: 30, bottom: 40, left: 90 },
      width = 360 - margin.left - margin.right,
      height = 360 - margin.top - margin.bottom;

    const svg = d3
      .select(".stat-div")
      .html("")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //.style("margin-left" ,100)
    //d3.json(languages)
    // const data =[12,5,6,6,9,10];
    // const data = languages;
    // d3.json("./data/languages", function(data){
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
      data => {
        data = arr.filter(a => a.value > 0).sort((a, b) => b.value - a.value);
        console.log(data);
        // })
        // console.log(data)

        const x = d3
          .scaleLinear()
          .domain([0, 100])
          .range([0, width]);
        //.paddingInner(0.3)
        //.paddingOuter(0.2)
        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        const y = d3
          .scaleBand()
          .range([0, height])
          .domain(data.map(d => d.title))
          .padding(0.1);
        svg.append("g").call(d3.axisLeft(y));

        //Bars

        // const h = 500; const x= 400
        const colorScale = d3.scaleOrdinal(d3.schemeSet3);

        svg
          .selectAll("myRect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", x(0))
          .attr("y", function(d) {
            return y(d.title);
          })
          .attr("width", function(d) {
            return x(d.value);
          })
          .attr("height", y.bandwidth())
          .attr("fill", function(d, i) {
            return colorScale(i);
          });
      }
    );
    // selection.attr("property", (d, i) => {})
  };

  return (
    <div>
      <div className='stat-div'></div>
    </div>
  );
};
export default Stats;
