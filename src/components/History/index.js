import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import {
  Grid,
  Toolbar,
  Button,
  Popover,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import currency from "currency.js";
import moment from "moment";
import * as timeago from "timeago.js";

import Pnl from "../utils/Pnl";

import { tradeHistoryAll } from "../../api";

import { convertUTCDateToLocalDate, median } from "../../utils";

const History = () => {
  const today = new Date();
  const [originalData, setOriginalData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [updatedOn, setUpdatedOn] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: today,
    key: "selection",
  });

  const [stats, setStats] = useState({
    showing: 0,
    count: 0,
    pnl: 0,
    averagePnl: 0,
    medianPnl: 0,
    biggestProfit: 0,
    biggestLoss: 0,
    winners: 0,
    losers: 0,
    commisions: 0,
    interest: 0,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilter = (table) => {
    let filtered = table.filter((item) => {
      let date = new Date(item.orderTime);
      date = convertUTCDateToLocalDate(date);
      return (
        item.orderTime === "" ||
        (date >= selectionRange.startDate && date <= selectionRange.endDate)
      );
    });

    let pnl = 0;
    let countNonZeroPnl = 0;
    let medianArray = [];
    let biggestProfit = 0;
    let biggestLoss = 0;
    let commisions = 0;
    let interest = 0;
    let count = 0;
    let winners = 0;
    let losers = 0;

    for (let item of filtered) {
      if (item.orderTime === "") continue;
      pnl += item.fifoPnlRealized;
      commisions += item.ibCommission;
      interest += item.accruedInt;
      count += 1;

      if (item.fifoPnlRealized !== 0) {
        medianArray.push(item.fifoPnlRealized);
        countNonZeroPnl++;

        if (item.fifoPnlRealized > 0) {
          winners += 1;
        } else {
          losers += 1;
        }
      }

      if (item.fifoPnlRealized > biggestProfit) {
        biggestProfit = item.fifoPnlRealized;
      }
      if (item.fifoPnlRealized < biggestLoss) {
        biggestLoss = item.fifoPnlRealized;
      }
    }
    const newStats = {
      showing: filtered.length,
      count: count,
      pnl: pnl,
      averagePnl: pnl / countNonZeroPnl,
      medianPnl: median(medianArray),
      biggestProfit: biggestProfit,
      biggestLoss: biggestLoss,
      winners: winners,
      losers: losers,
      commisions: commisions,
      interest: interest,
    };

    setStats(newStats);
    setRowData(filtered);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    tradeHistoryAll().then((res) => {
      let raw = res.data.rows;
      let parsed = raw.map((item) => {
        return {
          ...item,
          symbol: item.symbol.split(" ")[0],
          orderTime: item.orderTime.replace(";", " "), // for firefox and safari
        };
      });
      setOriginalData(parsed);
      applyFilter(parsed);
      setUpdatedOn(
        timeago.format(
          convertUTCDateToLocalDate(new Date(res.data.lastRun.last_run))
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toolbar>
        <Button aria-describedby={id} onClick={handleClick}>
          {moment(selectionRange.startDate).format("MMM DD, YYYY")} -{" "}
          {moment(selectionRange.endDate).format("MMM DD, YYYY")}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div style={{ margin: "0.5rem" }}>
            <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={(dt) => setSelectionRange(dt.selection)}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={10} />
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  onClick={() => applyFilter(originalData)}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </div>
        </Popover>
        <Typography variant="caption" style={{ marginLeft: "1rem" }}>
          Updated {updatedOn}
        </Typography>
      </Toolbar>
      {/* <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>
         
          </Paper>
        </Grid>
      </Grid> */}

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        style={{ margin: "0.5rem", marginTop: "0" }}
      >
        <Typography variant="subtitle2" textAlign="center">
          Showing <div>{stats.showing}</div>
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          Count <div>{stats.count}</div>
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          PnL <Pnl value={stats.pnl} />
        </Typography>

        <Typography variant="subtitle2">
          Avg Pnl <Pnl value={stats.averagePnl} />
        </Typography>
        <Typography variant="subtitle2">
          Median Pnl <Pnl value={stats.medianPnl} />
        </Typography>
        <Typography variant="subtitle2">
          Biggest Profit <Pnl value={stats.biggestProfit} />
        </Typography>
        <Typography variant="subtitle2">
          Biggest Loss <Pnl value={stats.biggestLoss} />
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          Winners <div>{stats.winners}</div>
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          Losers <div>{stats.losers}</div>
        </Typography>
        <Typography variant="subtitle2">
          Commisions <div> {currency(stats.commisions).format()}</div>
        </Typography>
        <Typography variant="subtitle2">
          Interest <div> {currency(stats.interest).format()}</div>
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid
          item
          xs={9}
          style={{ height: "90vh", overflow: "auto", minWidth: "71rem" }}
        >
          <div
            className="ag-theme-balham"
            style={{ height: "100%", width: "71rem" }}
          >
            <AgGridReact
              rowData={rowData}
              defaultColDef={{
                flex: 1,
                maxWidth: 200,
                editable: true,
                resizable: true,
              }}
              frameworkComponents={{
                pnl: Pnl,
              }}
            >
              {/* <AgGridColumn field="_id" sortable={true} filter={true} maxWidth={90} /> */}
              <AgGridColumn
                field="symbol"
                sortable={true}
                filter={true}
                maxWidth={80}
              />
              <AgGridColumn
                field="description"
                sortable={true}
                filter={true}
                minWidth={400}
              />

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
                maxWidth={60}
              />

              <AgGridColumn
                field="expiry"
                sortable={true}
                filter={true}
                maxWidth={120}
                valueFormatter={(params) => {
                  if (params.data.expiry !== "")
                    return moment(params.data.expiry).format("MMM DD, YYYY");
                  else return "";
                }}
              />

              <AgGridColumn
                field="strike"
                sortable={true}
                filter={true}
                maxWidth={80}
                valueFormatter={(params) => {
                  // check if params.data is number
                  if (params.data.strike !== "")
                    return currency(params.data.strike, {
                      precision: 0,
                    }).format();
                  else return "";
                }}
              />

              <AgGridColumn
                field="putCall"
                sortable={true}
                filter={true}
                maxWidth={20}
              />

              <AgGridColumn
                field="tradePrice"
                sortable={true}
                filter={true}
                maxWidth={70}
              />
              {/* <AgGridColumn
                  field="closePrice"
                  sortable={true}
                  filter={true}
                  maxWidth={70}
                /> */}
              <AgGridColumn
                field="fifoPnlRealized"
                sortable={true}
                filter={true}
                maxWidth={120}
                // valueFormatter={(params) => {
                //   return currency(params.data.fifoPnlRealized).format();
                // }}
                cellRendererSelector={(params) => {
                  return { component: "pnl" };
                }}
              />
              {/* <AgGridColumn
                  field="capitalGainsPnl"
                  sortable={true}
                  filter={true}
                  maxWidth={70}
                /> */}
              <AgGridColumn
                field="ibCommission"
                sortable={true}
                filter={true}
                maxWidth={90}
                valueFormatter={(params) => {
                  return currency(params.data.ibCommission).format();
                }}
              />

              <AgGridColumn
                field="orderTime"
                sortable={true}
                filter={true}
                sort="desc"
                maxWidth={150}
                valueFormatter={(params) => {
                  return moment(params.data.orderTime).format(
                    "MMM DD, hh:MM a"
                  );
                }}
              />
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default History;
