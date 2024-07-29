const colorMap = {
  2600: "crimson",
  NES: "darkblue",
  PC: "darkgreen",
  DS: "darkslategray",
  GB: "saddlebrown",
  SNES: "darkolivegreen",
  GEN: "darkmagenta",
  GG: "darkred",
  SCD: "darkviolet",
  NG: "dimgray",
  PS: "violet",
  SAT: "chocolate",
  "3DO": "cadetblue",
  TG16: "darkgoldenrod",
  N64: "firebrick",
  PCFX: "indigo",
  DC: "midnightblue",
  WS: "olive",
  PS2: "peru",
  XB: "rosybrown",
  GBA: "brown",
  GC: "seagreen",
  PSP: "slateblue",
  X360: "slategray",
  Wii: "steelblue",
  PS3: "darkorange",
  "3DS": "darkgray",
  PSV: "darkkhaki",
  WiiU: "darkseagreen",
  PS4: "forestgreen",
  XOne: "darkcyan",
};

d3.csv("vgsales.csv").then(function (data) {
  data.forEach(function (d) {
    d.Global_Sales = +d.Global_Sales * 1000000; // Data in millions
    d.NA_Sales = +d.NA_Sales * 1000000; // Data in millions
    d.EU_Sales = +d.EU_Sales * 1000000; // Data in millions
    d.JP_Sales = +d.JP_Sales * 1000000; // Data in millions
    d.Other_Sales = +d.Other_Sales * 1000000; // Data in millions
  });

  const gameSalesByPlatformGlobal = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.Global_Sales),
    (d) => d.Platform
  );
  const gameSalesByPlatformNA = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.NA_Sales),
    (d) => d.Platform
  );
  const gameSalesByPlatformEU = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.EU_Sales),
    (d) => d.Platform
  );
  const gameSalesByPlatformJP = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.JP_Sales),
    (d) => d.Platform
  );
  const gameSalesByPlatformOther = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.Other_Sales),
    (d) => d.Platform
  );

  const newDataGlobal = Array.from(
    gameSalesByPlatformGlobal,
    ([platform, sales]) => ({
      platform,
      sales,
    })
  );
  const newDataNA = Array.from(gameSalesByPlatformNA, ([platform, sales]) => ({
    platform,
    sales,
  }));
  const newDataEU = Array.from(gameSalesByPlatformEU, ([platform, sales]) => ({
    platform,
    sales,
  }));
  const newDataJP = Array.from(gameSalesByPlatformJP, ([platform, sales]) => ({
    platform,
    sales,
  }));
  const newDataOther = Array.from(
    gameSalesByPlatformOther,
    ([platform, sales]) => ({
      platform,
      sales,
    })
  );

  const sales_title = ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"];

  const select = d3.select(".earnings-filter");
  sales_title.forEach((title) => {
    select.append("option").text(`${title}`).attr("value", title);
  });

  const margin = { top: 20, right: 20, bottom: 40, left: 70 };
  const width = 1100 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const tooltip = d3.select(".tooltip");
  let newData = [];

  function updateGraph(selectedRegion) {
    if (selectedRegion === "NA_Sales") newData = newDataNA;
    else if (selectedRegion === "EU_Sales") newData = newDataEU;
    else if (selectedRegion === "JP_Sales") newData = newDataJP;
    else if (selectedRegion === "Other_Sales") newData = newDataOther;
    else newData = newDataGlobal;

    const xScale = d3
      .scaleBand()
      .domain(newData.map((d) => d.platform))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(newData, (d) => d.sales)])
      .range([height, 0]);

    const svg = d3
      .select(".bar-graph-4")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .selectAll(".bar")
      .data(newData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.platform))
      .attr("y", (d) => yScale(d.sales))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.sales))
      .attr("fill", (d) => colorMap[d.platform] || "black")
      .on("mouseover", function (event, d) {
        const platformData = data.filter(
          (cols) => cols.Platform === d.platform
        );

        const totalGlobalSales = d3.sum(
          platformData,
          (cols) => cols.Global_Sales
        );
        const totalNASales = d3.sum(platformData, (cols) => cols.NA_Sales);
        const totalEUSales = d3.sum(platformData, (cols) => cols.EU_Sales);
        const totalJPSales = d3.sum(platformData, (cols) => cols.JP_Sales);
        const totalOtherSales = d3.sum(
          platformData,
          (cols) => cols.Other_Sales
        );

        const highestEarningVideoGameGlobal = d3.max(
          platformData,
          (cols) => cols.Global_Sales
        );
        const highestEarningVideoGameNA = d3.max(
          platformData,
          (cols) => cols.NA_Sales
        );
        const highestEarningVideoGameEU = d3.max(
          platformData,
          (cols) => cols.EU_Sales
        );
        const highestEarningVideoGameJP = d3.max(
          platformData,
          (cols) => cols.JP_Sales
        );
        const highestEarningVideoGameOther = d3.max(
          platformData,
          (cols) => cols.Other_Sales
        );

        const videoGameTitleGlobal = platformData.find(
          (cols) => cols.Global_Sales === highestEarningVideoGameGlobal
        ).Name;
        const videoGameTitleNA = platformData.find(
          (cols) => cols.NA_Sales === highestEarningVideoGameNA
        ).Name;
        const videoGameTitleEU = platformData.find(
          (cols) => cols.EU_Sales === highestEarningVideoGameEU
        ).Name;
        const videoGameTitleJP = platformData.find(
          (cols) => cols.JP_Sales === highestEarningVideoGameJP
        ).Name;
        const videoGameTitleOther = platformData.find(
          (cols) => cols.Other_Sales === highestEarningVideoGameOther
        ).Name;

        let totalSales = 0;
        let videoGameTitle = "";
        let highestEarningVideoGame = 0;

        if (selectedRegion === "NA_Sales") {
          totalSales = totalNASales;
          videoGameTitle = videoGameTitleNA;
          highestEarningVideoGame = highestEarningVideoGameNA;
        } else if (selectedRegion === "EU_Sales") {
          totalSales = totalEUSales;
          videoGameTitle = videoGameTitleEU;
          highestEarningVideoGame = highestEarningVideoGameEU;
        } else if (selectedRegion === "JP_Sales") {
          totalSales = totalJPSales;
          videoGameTitle = videoGameTitleJP;
          highestEarningVideoGame = highestEarningVideoGameJP;
        } else if (selectedRegion === "Other_Sales") {
          totalSales = totalOtherSales;
          videoGameTitle = videoGameTitleOther;
          highestEarningVideoGame = highestEarningVideoGameOther;
        } else {
          totalSales = totalGlobalSales;
          videoGameTitle = videoGameTitleGlobal;
          highestEarningVideoGame = highestEarningVideoGameGlobal;
        }

        tooltip
          .style("display", "block")
          .html(
            `
            Total Earnings: $${totalSales.toLocaleString()}<br>
            Video Game Count: ${platformData.length}<br>
            Highest Earning Video Game: ${videoGameTitle} ($${
              highestEarningVideoGame / 1000000
            }M)
            `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 40 + "px");
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
      .text("Platform")
      .style("font-size", "13px");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .text("Video Game Earnings (in Millions)")
      .style("font-size", "13px");
  }

  updateGraph("global");

  d3.select(".earnings-filter").on("change", function () {
    const selectedRegion = d3.select(this).property("value");
    d3.select("svg").remove();
    updateGraph(selectedRegion);
  });
});
