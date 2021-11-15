import React, { useState, useEffect } from "react";

import { AgChartsReact } from "ag-charts-react";

import currency from "currency.js";

const getColor = (pnl, biggestGain, biggestLoss) => {
  if (pnl > 0) {
    return (pnl / biggestGain) * 10;
  } else {
    return (pnl / biggestLoss) * -10;
  }
};

const tooltipRenderer = (params) => {
  const { datum } = params;
  const title = params.datum.data.symbol;
  let content = "<div>";

  if (datum.parent) {
    content += `<div style="font-weight: bold;">${currency(
      params.datum.data.pnl
    ).format()}</div>`;
  }

  content += "</div>";
  return {
    title,
    content,
    backgroundColor: "gray",
  };
};

const Symbols = ({ rowData, stats }) => {
  const [options, setOptions] = useState({
    type: "hierarchy",
    data: [],
    series: [
      {
        type: "treemap",
        labelKey: "name",
        sizeKey: "size",
        colorKey: "color",
        tooltip: { renderer: tooltipRenderer },
      },
    ],
    // title: {
    //   text: "S&P 500 index stocks categorized by sectors and industries.",
    // },
    // subtitle: {
    //   text: "Area represents market cap. Color represents change from the day before.",
    // },
  });

  useEffect(() => {
    let children = {};
    for (const item of rowData) {
      if (item.orderTime !== "") {
        if (item.fifoPnlRealized !== 0) {
          if (!(item.assetCategory in children)) {
            children[item.assetCategory] = {};
          }

          if (!(item.symbol in children[item.assetCategory])) {
            children[item.assetCategory][item.symbol] = {};
          }
          const currPnl =
            (children[item.assetCategory][item.symbol].pnl || 0) +
            (item.fifoPnlRealized || 0);

          children[item.assetCategory][item.symbol] = {
            ...children[item.assetCategory][item.symbol],
            name: item.symbol,
            pnl: currPnl,
            size: Math.PI * Math.log(Math.abs(currPnl)) + 1,
            color: getColor(currPnl, stats.biggestProfit, stats.biggestLoss),
          };
        }
      }
    }

    const parsed = [];
    for (const key in children) {
      parsed.push({
        name: key,
        children: Object.values(children[key]),
        color: 0,
      });
    }
    setOptions({
      ...options,
      data: { name: "Root", children: parsed, color: 0 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData, stats]);
  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};

export default Symbols;
