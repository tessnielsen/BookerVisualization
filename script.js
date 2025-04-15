const scroller = scrollama();

const svg = d3.select("#chart");
const margin = { top: 20, right: 20, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const g = svg
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Scales and axes
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([0, height]).padding(0.2);

Promise.all([
  d3.csv("./data/booker_speech_with_seconds.csv"),
  d3.csv("./data/longest_speeches.csv"),
]).then(([bookerData, longestData]) => {
  // Combine and prep
  const combined = longestData.concat([{ Speaker: "Cory Booker", Seconds: d3.max(bookerData, d => +d.Seconds) }]);
  combined.sort((a, b) => d3.descending(+a.Seconds, +b.Seconds));

  x.domain([0, d3.max(combined, d => +d.Seconds)]);
  y.domain(combined.map(d => d.Speaker));

  // Axes
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(5));

  g.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

  // Bars
  g.selectAll(".bar")
    .data(combined)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.Speaker))
    .attr("width", d => x(+d.Seconds))
    .attr("height", y.bandwidth())
    .attr("fill", d => d.Speaker === "Cory Booker" ? "#3366cc" : "#999");

  // Set up scrollama
  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      debug: false
    })
    .onStepEnter((response) => {
      const step = response.element.getAttribute("data-index");

      // For example, at step 2 highlight a quote section
      if (step === "2") {
        alert("Key quote: 'This is not a moment to shrink from our responsibilities...'"); // Replace with nicer annotation
      }
    });
});
