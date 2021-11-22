import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

import Layout from "../Layout";
import History from "../History";
import Universe from "../Universe";
import Symbol from "../Universe/symbol";

export default function App() {
  let location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);

  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Universe />} />
            <Route path="universe/:symbol" element={<Symbol />} />
            <Route path="about" element={<Home />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Nothing to see here</h2>
    </div>
  );
}
