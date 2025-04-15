function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  } else {
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}

const speeches = [
  { name: "Chris Murphy", seconds: 53400 },
  { name: "Alfonse D'Amato", seconds: 54800 },
  { name: "Jeff Merkley", seconds: 55680},
  { name: "Huey Long", seconds: 55800},
  { name: "William Proxmire", seconds: 58320},
  { name: "Robert M. La Follette Sr.", seconds: 66180},
  { name: "Ted Cruz", seconds: 76680},
  { name: "Wayne Morse", seconds: 80760},
  { name: "Alfonse D'Amato", seconds: 84600},
  { name: "Strom Thurmond", seconds: 87480},
  { name: "Cory Booker", seconds: 90300 }
];

const quotes = [
  { time: 1920, text: "I rise with the intention of disrupting the normal business of the United States Senate for as long as I am physically able." },
  { time: 28080, text: "Yes, I will yield for a question while retaining the floor." },
  { time: 85000, text: "This is a moral moment. It's not left or right, it's right or wrong. Let's get in good trouble. My friend, Madam President, I yield the floor." }
];

const timeline = d3.select("#timeline");
const maxTime = d3.max(speeches, d => d.seconds);

const scale = d3.scaleLinear().domain([0, maxTime]).range([0, 9000]);

const rows = timeline
  .selectAll(".row")
  .data(speeches)
  .join("div")
  .attr("class", "row");

rows.append("div")
  .attr("class", "label")
  .text(d => d.name);

rows.append("div")
  .attr("class", d => "bar" + (d.name === "Cory Booker" ? " booker" : ""))
  .style("width", d => scale(d.seconds) + "px")
  .each(function(d) {
    d3.select(this)
      .append("span")
      .attr("class", "time-label")
      .text(formatTime(d.seconds));
  });

const bubbleContainer = d3.select("#quote-bubbles");

bubbleContainer
  .selectAll(".bubble")
  .data(quotes)
  .join("div")
  .attr("class", "bubble")
  .style("left", d => scale(d.time) + "px")
  .text(d => d.text);
