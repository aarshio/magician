import React from "react";
import { Link } from "react-router-dom";

import ExternalLink from "./ExternalLink";

const SymbolLink = ({ value }) => {
  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "teal" }}
        to={`/universe/${value.toLowerCase()}`}
      >
        {value.toUpperCase()}
      </Link>{" "}
      <ExternalLink value={value.toUpperCase()} />
    </div>
  );
};

export default SymbolLink;
