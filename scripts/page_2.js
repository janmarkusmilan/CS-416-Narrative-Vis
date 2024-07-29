const colorMap = {
  1980: "crimson",
  1981: "darkblue",
  1982: "darkgreen",
  1983: "darkslategray",
  1984: "saddlebrown",
  1985: "darkolivegreen",
  1986: "darkmagenta",
  1987: "darkred",
  1988: "darkviolet",
  1989: "dimgray",
  1990: "violet",
  1991: "chocolate",
  1992: "cadetblue",
  1993: "darkgoldenrod",
  1994: "firebrick",
  1995: "indigo",
  1996: "midnightblue",
  1997: "olive",
  1998: "peru",
  1999: "rosybrown",
  2000: "brown",
  2001: "seagreen",
  2002: "slateblue",
  2003: "slategray",
  2004: "steelblue",
  2005: "darkorange",
  2006: "darkgray",
  2007: "darkkhaki",
  2008: "darkseagreen",
  2009: "forestgreen",
  2010: "darkcyan",
  2011: "darkorchid",
  2012: "darkslateblue",
  2013: "darkturquoise",
  2014: "goldenrod",
  2015: "sienna",
  2016: "orange",
};

d3.csv("vgsales.csv").then(function (data) {
  data.forEach(function (d) {
    d.Global_Sales = +d.Global_Sales * 1000000; // Data in millions
  });

  const gameSalesByYear = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.Global_Sales),
    (d) => d.Year
  );
  const newData = Array.from(gameSalesByYear, ([year, sales]) => ({
    year,
    sales,
  }));

  const margin = { top: 20, right: 20, bottom: 40, left: 70 };
  const width = 1000 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(newData.map((d) => d.year))
    .range([0, width])
    .padding(1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(newData, (d) => d.sales)])
    .range([height, 0]);

  const svg = d3
    .select(".line-graph-2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const line = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.sales))
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
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.sales))
    .attr("r", 4)
    .attr("fill", (d) => colorMap[d.year] || "black")
    .on("mouseover", function (event, d) {
      const yearlyData = data.filter((cols) => cols.Year === d.year);
      const totalGlobalSales = d3.sum(yearlyData, (cols) => cols.Global_Sales);
      const highestEarningVideoGame = d3.max(
        yearlyData,
        (cols) => cols.Global_Sales
      );
      const videoGameTitle = yearlyData.find(
        (cols) => cols.Global_Sales === highestEarningVideoGame
      ).Name;

      tooltip
        .style("display", "block")
        .html(
          `
          Total Global Earnings: $${totalGlobalSales.toLocaleString()}<br>
          Video Game Count: ${yearlyData.length}<br>
          Highest Earning Video Game: ${videoGameTitle} ($${
            highestEarningVideoGame / 1000000
          }M)
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
    .call(d3.axisBottom(xScale).tickFormat((d) => d));

  svg
    .append("g")
    .call(d3.axisLeft(yScale).tickFormat((d) => `$${d / 1000000}M`));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .text("Year")
    .style("font-size", "13px");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .text("Video Game Global Earnings (in Millions)")
    .style("font-size", "13px");
});
