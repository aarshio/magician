import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import History from "../History";

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<History />} />
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