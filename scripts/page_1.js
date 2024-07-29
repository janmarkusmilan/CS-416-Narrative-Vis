const colorMap = {
  1980: "crimson",
  1990: "violet",
  2000: "brown",
  2010: "darkcyan",
};

d3.csv("vgsales.csv").then(function (data) {
  data.forEach(function (d) {
    d.Global_Sales = +d.Global_Sales * 1000000; // Data in millions
  });

  data.forEach(function (d) {
    d.Decade = Math.floor(d.Year / 10) * 10;
  });

  data = data.filter((d) => d.Decade >= 1980 && d.Decade <= 2010);

  const gameCountByDecade = d3.rollup(
    data,
    (v) => v.length,
    (d) => d.Decade
  );
  const newData = Array.from(gameCountByDecade, ([decade, count]) => ({
    decade,
    count,
  }));

  const margin = { top: 20, right: 80, bottom: 50, left: 70 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(newData.map((d) => d.decade))
    .range([0, width])
    .padding(1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(newData, (d) => d.count)])
    .range([height, 0]);

  const svg = d3
    .select(".line-graph-1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const line = d3
    .line()
    .x((d) => xScale(d.decade))
    .y((d) => yScale(d.count))
    .curve(d3.curveMonotoneX);

  const tooltip = d3.select(".tooltip");

  svg
    .append("path")
    .data([newData])
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5);

  svg
    .selectAll(".dot")
    .data(newData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => xScale(d.decade))
    .attr("cy", (d) => yScale(d.count))
    .attr("r", 4)
    .attr("fill", (d) => colorMap[d.decade] || "black")
    .on("mouseover", function (event, d) {
      const decadeData = data.filter((cols) => cols.Decade === d.decade);
      const averageGlobalSales = d3.mean(
        decadeData,
        (cols) => cols.Global_Sales
      );

      tooltip
        .style("display", "block")
        .html(
          `
          Count of Video Games: ${decadeData.length}<br>
          Average Global Earnings: $${averageGlobalSales.toLocaleString()}
          `
        )
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 35 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("display", "none");
    });

  svg
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(xScale).tickFormat((d) => `${d}s`));

  svg.append("g").call(d3.axisLeft(yScale).tickFormat((d) => d));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .text("Decade")
    .style("font-size", "13px");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .text("Count of Video Games")
    .style("font-size", "13px");
});
