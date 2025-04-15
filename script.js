const speeches = [
  // Replace with d3.csv() load if using data file
  { name: "Senator A", seconds: 14400 }, // 4 hours
  { name: "Senator B", seconds: 21600 },
  { name: "Senator C", seconds: 36000 },
  { name: "Cory Booker", seconds: 90000 }, // 25 hours
];

const svg = d3.select("#timeline");
const width = svg.node().getBoundingClientRect().width;
const height = speeches.length * 50;

svg.attr("height", height);

const x = d3.scaleLinear()
  .domain([0, d3.max(speeches, d => d.seconds)])
  .range([0, width - 150]);

const g = svg.append("g").attr("transform", "translate(100,20)");

g.selectAll("rect")
  .data(speeches)
  .join("rect")
  .attr("class", d => "bar" + (d.name === "Cory Booker" ? " booker" : ""))
  .attr("y", (_, i) => i * 50)
  .attr("height", 30)
  .attr("x", 0)
  .attr("width", 0) // animate from 0
  .transition()
  .duration(2000)
  .attr("width", d => x(d.seconds));

g.selectAll("text")
  .data(speeches)
  .join("text")
  .attr("class", "label")
  .attr("x", -10)
  .attr("y", (_, i) => i * 50 + 20)
  .attr("text-anchor", "end")
  .text(d => d.name);

// Setup scrollama
const scroller = scrollama();

scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: false
  })
  .onStepEnter(response => {
    // Add logic for highlighting, showing quotes, etc.
    console.log("Scroll step:", response.index);
  });
