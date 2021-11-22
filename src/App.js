import "./App.css";
import Path from "./components/Router";
import ReactGA from "react-ga";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-S37PVZB923");
  }, []);

  return <Path />;
};

export default App;
