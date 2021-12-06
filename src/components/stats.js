import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";

function getBrowserLanguage() {
  console.log("idioma", navigator.language || navigator.userLanguage);
  console.log(
    "tipo de idioma",
    typeof navigator.language || navigator.userLanguage
  );
  let idioma = navigator.language || navigator.userLanguage;
  if (idioma.startsWith("es")) {
    return "Uso de poder (KwH) - Hoy";
  } else if (idioma.startsWith("en")) {
    return "Power usage (KwH) - Today";
  } else {
    return "Power usage (KwH) - Today";
  }
}

function Stats(props) {
  const d3Chart = useRef(null);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(props.rooms);
    const tWidth = 400;
    const tHeight = 400;
    const radius = 150;

    // Define size and pos of svg
    const svg = d3
      .select(d3Chart.current)
      .attr("width", tWidth)
      .attr("height", tHeight)
      .append("g")
      .attr("transform", `translate(${tWidth / 2}, ${tHeight / 2})`);

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -radius - 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(getBrowserLanguage());
    // get positions base on each data object
    const pieData = d3.pie().value((d) => d.powerUsage.value)(rooms);
    console.log("pieData", pieData);

    // Define arcs for graph and label

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colors = d3.scaleOrdinal().range(d3.schemeCategory10);

    // Add tooltip
    const tooldiv = d3
      .select("#chartD3")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background-color", "white");

    // Draw piechart
    svg
      .append("g")
      .selectAll("path")
      .data(pieData)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      .on("mousemove", function (e) {
        tooldiv
          .style("top", e.pageY - 30 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseover", (e, d) => {
        tooldiv
          .style("visibility", "visible")
          .text(
            `${d.data.name}: ${d.data.powerUsage.value} ${d.data.powerUsage.unit}`
          );
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });
  }, [props.rooms, rooms]);

  return (
    <div>
      <h2
        className="roomTitle"
        style={{ textAlign: "left", marginLeft: "2rem" }}
      >
        <FormattedMessage id="stats" />
      </h2>
      <div id="chartD3">
        <svg ref={d3Chart}></svg>
      </div>
    </div>
  );
}

export default Stats;
