import React, { useState, useEffect } from "react";

import { AgChartsReact } from "ag-charts-react";
import currency from "currency.js";

const Performance = ({ originalData }) => {
  const [options, setOptions] = useState({
    autoSize: true,
    data: [],
    // title: {
    //   text: "TTM Return ($)",
    //   fontSize: 18,
    // },
    // subtitle: {
    //   text: "Source: Ministry of Justice, HM Prison Service, and Her Majesty\u2019s Prison and Probation Service",
    // },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "column",
        xKey: "month",
        yKeys: ["loss", "gain", "total"],
        yNames: ["Loss", "Gain", "Total"],
        grouped: true,
        fills: ["#F15F36", "LightGreen", "#19A0AA"],
        strokes: ["#F15F36", "LightGreen", "#19A0AA"],
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        label: {
          formatter: function (params) {
            return currency(params.value).format();
          },
        },
      },
    ],
  });

  useEffect(() => {
    let incremental = [];
    const today = new Date();

    const gain = {};
    const loss = {};
    const total = {};

    for (let item of originalData) {
      if (item.orderTime === "") continue;
      let itemYear = new Date(item.orderTime).getFullYear();
      let itemMonth = new Date(item.orderTime).getMonth();
      const key = [itemMonth, itemYear];

      if (item.fifoPnlRealized > 0) {
        gain[key] = (gain[key] || 0) + item.fifoPnlRealized;
      }

      if (item.fifoPnlRealized < 0) {
        loss[key] = (loss[key] || 0) + item.fifoPnlRealized;
      }

      total[key] = (total[key] || 0) + item.fifoPnlRealized;
    }

    for (let i = 12; i >= 0; i--) {
      const start = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const idxDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      let label = start.toLocaleString("en-us", {
        month: "short",
      });
      if (idxDate.getFullYear() !== today.getFullYear()) {
        label += start
          .toLocaleString("en-us", {
            year: "numeric",
          })
          .substring(3);
      }
      const key = [idxDate.getMonth(), idxDate.getFullYear()];
      if (
        loss[key] !== undefined &&
        gain[key] !== undefined &&
        total[key] !== undefined
      ) {
        incremental.push({
          month: label,
          loss: loss[key] || 0,
          gain: gain[key] || 0,
          total: total[key] || 0,
        });
      }
    }
    setOptions({ ...options, data: incremental });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalData]);

  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};
export default Performance;
