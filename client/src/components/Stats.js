import React, {Component} from "react";
import * as d3 from "d3";
// import * as d3Scale from "d3-scale"

class Stats  extends Component {

componentDidMount(){
  this.drawChart();
}

drawChart(){
  const data =[12,5,6,6,9,10]
  // const h = 500; const x= 400
  const colorScale= d3.scaleOrdinal(d3.schemeSet3)
  const svg = d3.select(".stat-div")
  .append("svg")
    .attr("width", 350)
    .attr("height", 150)
    .style("margin-left" ,100)
    

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => 10*d )
    .attr("width", 15)
    .attr("height", (d,i) => d *10)
    .attr("fill", function(d,i){return colorScale(i)})


  // selection.attr("property", (d, i) => {})

}


render() {
  return (
    <div>
      <h1>Display your stats here</h1>
      <div className="stat-div"></div>

    </div>
  );
};
}
export default Stats;
