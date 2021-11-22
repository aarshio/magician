import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

const openAll = (value) => {
  window.open(`https://finviz.com/quote.ashx?t=${value}`, "_blank");
};

const ExternalLink = ({ value }) => {
  return (
    <LaunchIcon
      style={{
        margin: 0,
        padding: 0,
        marginTop: "0.1rem",
        color: "SteelBlue",
        fontSize: "0.8rem",
        cursor: "pointer",
      }}
      onClick={() => openAll(value)}
    />
  );
};

export default ExternalLink;
