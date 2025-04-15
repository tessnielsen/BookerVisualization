d3.csv("./data/longest_speeches.csv").then(function(data) {
  // Convert 'seconds' to numbers
  data.forEach(d => {
    d.TimeInt = +d.TimeInt;
  });

  const timeline = d3.select("#timeline");
  const maxTime = d3.max(data, d => d.TimeInt);
  const scale = d3.scaleLinear().domain([0, maxTime]).range([0, 9000]);

  timeline
    .selectAll(".bar")
    .data(data)
    .join("div")
    .attr("class", d => "bar" + (d.Name === "Cory Booker" ? " booker" : ""))
    .style("width", d => scale(d.TimeInt) + "px");
});





