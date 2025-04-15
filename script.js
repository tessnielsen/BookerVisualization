d3.csv("./data/longest_speeches.csv").then(function(data) {
  // Convert time strings to numbers
  data.forEach(d => {
    d.TimeInt = +d.TimeInt;
  });

  // Log it just to check
  console.log("Loaded data:", data);

  // Build your timeline here
  drawTimeline(data);
});



