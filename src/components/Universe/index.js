import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Grid } from "@mui/material";

import { universeAll } from "../../api";

import SymbolLink from "../utils/SymbolLink";

const Universe = () => {
  const [universe, setUniverse] = useState([]);
  useEffect(() => {
    universeAll().then((res) => {
      setUniverse(res.data.rows);
    });
  }, [universe]);

  return (
    <div>
      <br />
      <Grid
        container
        spacing={1}
        style={{
          minWidth: "97rem",
          overflowX: "auto",
        }}
        justifyContent="center"
      >
        <Grid
          item
          style={{
            height: "93vh",
            overflow: "auto",
            minWidth: "67rem",
          }}
        >
          <div className="ag-theme-balham" style={{ height: "100%" }}>
            <AgGridReact
              rowData={universe}
              defaultColDef={{
                flex: 1,
                // maxWidth: 200,
                editable: true,
                resizable: true,
              }}
              frameworkComponents={{
                symLink: SymbolLink,
              }}
            >
              <AgGridColumn
                field="symbol"
                sortable={true}
                filter={true}
                // maxWidth={60}
                cellRendererSelector={(params) => {
                  return { component: "symLink" };
                }}
              />
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Universe;
