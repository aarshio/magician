import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Stack,
  Divider,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import SymbolLink from "../utils/SymbolLink";
import Add from "../Add";
import PostsView from "../PostsView";

import { getPostsBySymbol, getSymbol } from "../../api";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Research = ({ symbol, posts }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="View" {...a11yProps(0)} />
          <Tab label="Add" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PostsView posts={posts} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Add symbol={symbol} setValue={setValue} />
      </TabPanel>
    </>
  );
};

const Symbol = () => {
  const { symbol } = useParams();
  // const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getSymbol(symbol).then((res) => {
      console.log(res.data);
      // setData(res.data);
      if (res.data.posts) {
        setPosts(res.data.posts);
      }

      getPostsBySymbol(symbol).then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
    });
  }, [symbol]);

  return (
    <div>
      <br />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        justifyContent="center"
        style={{ margin: "0.5rem", marginTop: "0", minWidth: "100rem" }}
      >
        <SymbolLink value={symbol} />
      </Stack>
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
          <div style={{ background: "white" }}>
            <Research symbol={symbol} posts={posts} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Symbol;
