import React, {Component} from "react";
import * as d3 from "d3";
// import * as d3Scale from "d3-scale"
import languages from "./data/languages.json"

class Stats  extends Component {

componentDidMount(){
  this.drawChart();
}
//https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
drawChart(){
  const margin = {top:20, right:30, bottom: 40, left: 90},
      width = 460 -margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
  
  const svg = d3.select(".stat-div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    //.style("margin-left" ,100)
    //d3.json(languages)  


  // const data =[12,5,6,6,9,10];
  // const data = languages;
  // d3.json("./data/languages", function(data){
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", (data)=> {
 data = languages;
  // })
  // console.log(data)


  const x = d3.scaleLinear()
    .domain([0,100])
    .range([0,width])
    //.paddingInner(0.3)
    //.paddingOuter(0.2)
  svg.append("g")
    .attr("transform", "translate(0,"+height+")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")

  const y = d3.scaleBand()
    .range([0,height])
    .domain(data.map((d) =>  d.name))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars

  // const h = 500; const x= 400
  const colorScale= d3.scaleOrdinal(d3.schemeSet3)
  
    

  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function(d) {return y(d.name); })
    .attr("width", function (d) {return x(d.value); })
    .attr("height", y.bandwidth())
    .attr("fill", function(d,i){return colorScale(i)})

})
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
