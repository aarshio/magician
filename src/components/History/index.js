import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import { tradeHistoryAll } from "../../api";

const History = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    tradeHistoryAll().then((res) => {
      setRowData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="ag-theme-balham" style={{ height: "100%" }}>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field="_id" sortable={true} filter={true} maxWidth={90} />
        <AgGridColumn
          field="symbol"
          sortable={true}
          filter={true}
          //   maxWidth={60}
        />
        <AgGridColumn field="description" sortable={true} filter={true} />

        <AgGridColumn
          field="assetCategory"
          sortable={true}
          filter={true}
          maxWidth={50}
        />
        <AgGridColumn
          field="buySell"
          sortable={true}
          filter={true}
          maxWidth={55}
        />
        <AgGridColumn
          field="currency"
          sortable={true}
          filter={true}
          maxWidth={50}
        />

        <AgGridColumn
          field="quantity"
          sortable={true}
          filter={true}
          //   maxWidth={60}
        />
        <AgGridColumn
          field="putCall"
          sortable={true}
          filter={true}
          maxWidth={20}
        />
        <AgGridColumn
          field="strike"
          sortable={true}
          filter={true}
          maxWidth={60}
        />
        <AgGridColumn
          field="expiry"
          sortable={true}
          filter={true}
          maxWidth={90}
        />

        <AgGridColumn
          field="tradePrice"
          sortable={true}
          filter={true}
          //   maxWidth={70}
        />
        <AgGridColumn field="closePrice" sortable={true} filter={true} />
        <AgGridColumn field="fifoPnlRealized" sortable={true} filter={true} />
        <AgGridColumn field="capitalGainsPnl" sortable={true} filter={true} />
        <AgGridColumn field="ibCommission" sortable={true} filter={true} />

        <AgGridColumn
          field="orderTime"
          sortable={true}
          filter={true}
          sort="desc"
        />
        <AgGridColumn field="case_timestamp" sortable={true} filter={true} />
      </AgGridReact>
    </div>
  );
};

export default History;
