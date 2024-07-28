const colorMap = {
  Shooter: "crimson",
  Misc: "darkblue",
  Fighting: "darkgreen",
  Sports: "darkslategray",
  Action: "saddlebrown",
  Platform: "darkolivegreen",
  Puzzle: "darkmagenta",
  Racing: "darkred",
  Simulation: "darkviolet",
  Adventure: "dimgray",
  "Role-Playing": "violet",
  Strategy: "chocolate",
};

d3.csv("vgsales.csv").then(function (data) {
  data.forEach(function (d) {
    d.Global_Sales = +d.Global_Sales * 1000000; // Data in millions
    d.NA_Sales = +d.NA_Sales * 1000000; // Data in millions
    d.EU_Sales = +d.EU_Sales * 1000000; // Data in millions
    d.JP_Sales = +d.JP_Sales * 1000000; // Data in millions
    d.Other_Sales = +d.Other_Sales * 1000000; // Data in millions
  });

  const gameSalesByGenreGlobal = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.Global_Sales),
    (d) => d.Genre
  );
  const gameSalesByGenreNA = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.NA_Sales),
    (d) => d.Genre
  );
  const gameSalesByGenreEU = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.EU_Sales),
    (d) => d.Genre
  );
  const gameSalesByGenreJP = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.JP_Sales),
    (d) => d.Genre
  );
  const gameSalesByGenreOther = d3.rollup(
    data,
    (v) => d3.sum(v, (d) => d.Other_Sales),
    (d) => d.Genre
  );

  const dataArrayGlobal = Array.from(
    gameSalesByGenreGlobal,
    ([genre, sales]) => ({
      genre,
      sales,
    })
  );
  const dataArrayNA = Array.from(gameSalesByGenreNA, ([genre, sales]) => ({
    genre,
    sales,
  }));
  const dataArrayEU = Array.from(gameSalesByGenreEU, ([genre, sales]) => ({
    genre,
    sales,
  }));
  const dataArrayJP = Array.from(gameSalesByGenreJP, ([genre, sales]) => ({
    genre,
    sales,
  }));
  const dataArrayOther = Array.from(
    gameSalesByGenreOther,
    ([genre, sales]) => ({
      genre,
      sales,
    })
  );

  const sales_title = ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"];

  const select = d3.select("#earnings-filter");
  sales_title.forEach((title) => {
    select.append("option").text(`${title}`).attr("value", title);
  });

  const margin = { top: 20, right: 20, bottom: 40, left: 70 };
  const width = 1000 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const tooltip = d3.select(".tooltip");
  let dataArray = [];

  function updatePlot(selectedRegion) {
    if (selectedRegion === "NA_Sales") dataArray = dataArrayNA;
    else if (selectedRegion === "EU_Sales") dataArray = dataArrayEU;
    else if (selectedRegion === "JP_Sales") dataArray = dataArrayJP;
    else if (selectedRegion === "Other_Sales") dataArray = dataArrayOther;
    else dataArray = dataArrayGlobal;

    const xScale = d3
      .scaleBand()
      .domain(dataArray.map((d) => d.genre))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray, (d) => d.sales)])
      .range([height, 0]);

    const svg = d3
      .select("#bar-graph-container-3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .selectAll(".bar")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.genre))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d.sales))
      .attr("height", (d) => height - yScale(d.sales))
      .attr("fill", (d) => colorMap[d.genre] || "#000000")
      .on("mouseover", function (event, d) {
        const genreData = data.filter((cols) => cols.Genre === d.genre);

        const totalGlobalSales = d3.sum(genreData, (cols) => cols.Global_Sales);
        const totalNASales = d3.sum(genreData, (cols) => cols.NA_Sales);
        const totalEUSales = d3.sum(genreData, (cols) => cols.EU_Sales);
        const totalJPSales = d3.sum(genreData, (cols) => cols.JP_Sales);
        const totalOtherSales = d3.sum(genreData, (cols) => cols.Other_Sales);

        const highestEarningVideoGameGlobal = d3.max(
          genreData,
          (cols) => cols.Global_Sales
        );
        const highestEarningVideoGameNA = d3.max(
          genreData,
          (cols) => cols.NA_Sales
        );
        const highestEarningVideoGameEU = d3.max(
          genreData,
          (cols) => cols.EU_Sales
        );
        const highestEarningVideoGameJP = d3.max(
          genreData,
          (cols) => cols.JP_Sales
        );
        const highestEarningVideoGameOther = d3.max(
          genreData,
          (cols) => cols.Other_Sales
        );

        const videoGameTitleGlobal = genreData.find(
          (cols) => cols.Global_Sales === highestEarningVideoGameGlobal
        ).Name;
        const videoGameTitleNA = genreData.find(
          (cols) => cols.NA_Sales === highestEarningVideoGameNA
        ).Name;
        const videoGameTitleEU = genreData.find(
          (cols) => cols.EU_Sales === highestEarningVideoGameEU
        ).Name;
        const videoGameTitleJP = genreData.find(
          (cols) => cols.JP_Sales === highestEarningVideoGameJP
        ).Name;
        const videoGameTitleOther = genreData.find(
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
            Video Game Count: ${genreData.length}<br>
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
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat((d) => d));

    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickFormat((d) => `$${d / 1000000}M`));

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text("Genre")
      .style("font-size", "13px");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .text("Video Game Earnings (in Millions)")
      .style("font-size", "13px");
  }

  updatePlot("global");

  d3.select("#earnings-filter").on("change", function () {
    const selectedRegion = d3.select(this).property("value");
    d3.select("svg").remove();
    updatePlot(selectedRegion);
  });
});
